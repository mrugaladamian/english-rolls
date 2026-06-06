import {
    ROLLS_JSON_KEY,
    INITIAL_ROLLS,
    ROLL_LEVEL_MAX,
    RESET_ROLLS_LEVEL,
    SWIPE_MIN_DISTANCE,
    SWIPE_LONG_DISTANCE,
    VIDEO_SHORT_TIME_JUMP,
    VIDEO_LONG_TIME_JUMP,
    VIDEO_MIN_TIME,
    VIDEO_JUMP_MESSAGE_TIMEOUT
} from './constants.js';
import { shuffle } from './utils.js';
window.Rolls = function () {
    return {
        isPlContent: true,
        isSpeak: true,
        isVideo: false,
        resetRollsLevel: 0,
        swipeStartPosition: null,
        rolls: {},
        backgroundVideoUrl: null,
        isVideoJumpVisible: false,
        videoJumpText: '',
        videoJumpTimeout: null,
        showPluginLoader: false,
        init() {
            this.rolls = this._getRollsFromLocalStorage();
            this.showPluginLoader = this._isPluginMode();
        },
        swipeStart(event) {
            this.swipeStartPosition = event.clientX;
        },
        swipeEnd(event, video) {
            if (this._hasSwipeStartPosition()) {
                const swipePosition = event.clientX - this.swipeStartPosition;
                this.swipeStartPosition = null;
                this._handleSwipe(swipePosition, video);
            }
        },
        swipeCancel() {
            this.swipeStartPosition = null;
        },
        nextRoll() {
            this.isPlContent = true;
            this.rolls[0].level = 0;
            this.rolls.push(this.rolls.shift());
            this._setLocalStorageRolls();
        },
        passedRoll() {
            this.isPlContent = true;
            this.rolls[0].level++;
            this._advanceRoll();
            this._setLocalStorageRolls();
        },
        trySpeakCurrentRollEn() {
            if (this._isSpeakEnabled()) {
                this.speakCurrentRollEn();
            }
        },
        rollPlContentClick() {
            this.resetRollsLevel = 0;
            this.isPlContent = false;
            this.trySpeakCurrentRollEn();
        },
        rollsLengthTextClick() {
            if (this._shouldResetRolls()) {
                this.resetRolls();
            }
        },
        videoIconClick(videoInput, video) {
            if (this._isVideoEnabled()) {
                this._removeBackgroundVideo(video);
            } else {
                videoInput.click();
            }
        },
        loadBackgroundVideo(event, video) {
            const file = event.target.files?.[0];
            if (this._canLoadBackgroundVideo(file, video)) {
                this._loadSelectedBackgroundVideo(file, video, event);
            }
        },
        loadPlugin(event) {
            const file = event.target.files?.[0];
            if (!file) {
                return;
            }
            const reader = new FileReader();
            reader.onload = () => {
                const code = reader.result;
                if (typeof code === 'string') {
                    const script = document.createElement('script');
                    script.textContent = code;
                    document.body.appendChild(script);
                    document.body.removeChild(script);
                }
            };
            reader.readAsText(file, 'utf-8');
            event.target.value = '';
        },
        openPluginFilePicker() {
            this.showPluginLoader = false;
            const input = this.$refs.pluginInput;
            if (input) {
                input.value = '';
                input.click();
            }
        },
        resetRolls() {
            localStorage.removeItem(ROLLS_JSON_KEY);
            this.init();
        },
        videoLoaded() {
            if (!this.isVideo && this.$refs.backgroundVideo?.src) {
                this.isVideo = true;
            }
        },
        speakCurrentRollEn() {
            const text = this.rolls[0]?.en?.trim();
            responsiveVoice.speak(text, "US English Female", {
                rate: 0.8,
                pitch: 1,
                volume: 1
            });
        },
        _isSpeakEnabled() {
            return this.isSpeak;
        },
        _isVideoEnabled() {
            return this.isVideo;
        },
        _hasSwipeStartPosition() {
            return this.swipeStartPosition !== null;
        },
        _handleSwipe(swipePosition, video) {
            if (this._canSwipeVideo(video)) {
                this._swipeVideo(swipePosition, video);
            }
        },
        _canSwipeVideo(video) {
            return this._isVideoEnabled() && !!video;
        },
        _swipeVideo(swipePosition, video) {
            if (this._isSwipeRight(swipePosition)) {
                this._moveVideoForward(video, swipePosition);
            } else if (this._isSwipeLeft(swipePosition)) {
                this._moveVideoBackward(video, swipePosition);
            }
        },
        _moveVideoForward(video, swipePosition) {
            const videoTimeJump = this._getSwipeVideoTimeJump(swipePosition);
            const videoTime = video.currentTime + videoTimeJump;
            this._setVideoTime(video, videoTime);
            this._showLongSwipeVideoJump(swipePosition, videoTimeJump);
        },
        _moveVideoBackward(video, swipePosition) {
            const videoTimeJump = this._getSwipeVideoTimeJump(swipePosition);
            const videoTime = video.currentTime - videoTimeJump;
            this._setVideoTime(video, videoTime);
            this._showLongSwipeVideoJump(swipePosition, videoTimeJump);
        },
        _setVideoTime(video, videoTime) {
            video.currentTime = Math.max(VIDEO_MIN_TIME, videoTime);
        },
        _showLongSwipeVideoJump(swipePosition, videoTimeJump) {
            if (this._isLongSwipe(swipePosition)) {
                this._showVideoJump(`${this._getSwipeDirectionSign(swipePosition)}${videoTimeJump}s`);
            }
        },
        _showVideoJump(videoJumpText) {
            this.videoJumpText = videoJumpText;
            this.isVideoJumpVisible = true;
            clearTimeout(this.videoJumpTimeout);
            this.videoJumpTimeout = setTimeout(() => {
                this.isVideoJumpVisible = false;
            }, VIDEO_JUMP_MESSAGE_TIMEOUT);
        },
        _getSwipeDirectionSign(swipePosition) {
            return this._isSwipeRight(swipePosition) ? '+' : '-';
        },
        _getSwipeVideoTimeJump(swipePosition) {
            return this._isLongSwipe(swipePosition) ? VIDEO_LONG_TIME_JUMP : VIDEO_SHORT_TIME_JUMP;
        },
        _isLongSwipe(swipePosition) {
            return Math.abs(swipePosition) > SWIPE_LONG_DISTANCE;
        },
        _isSwipeRight(swipePosition) {
            return swipePosition > SWIPE_MIN_DISTANCE;
        },
        _isSwipeLeft(swipePosition) {
            return swipePosition < -SWIPE_MIN_DISTANCE;
        },
        _shouldResetRolls() {
            return this.resetRollsLevel++ === RESET_ROLLS_LEVEL;
        },
        _canLoadBackgroundVideo(file, video) {
            return file && video;
        },
        _loadSelectedBackgroundVideo(file, video, event) {
            this._revokeBackgroundVideoUrl();
            this._setBackgroundVideoUrl(file);
            this._setBackgroundVideo(video);
            this._setVideoEnabled();
            this._resetVideoInput(event);
        },
        _removeBackgroundVideo(video) {
            this._revokeBackgroundVideoUrl();
            this._clearBackgroundVideo(video);
            this._setVideoDisabled();
        },
        _revokeBackgroundVideoUrl() {
            if (this._hasBackgroundVideoUrl()) {
                URL.revokeObjectURL(this.backgroundVideoUrl);
            }
        },
        _hasBackgroundVideoUrl() {
            return this.backgroundVideoUrl;
        },
        _setBackgroundVideoUrl(file) {
            this.backgroundVideoUrl = URL.createObjectURL(file);
        },
        _setBackgroundVideo(video) {
            video.src = this.backgroundVideoUrl;
            video.volume = 0.4;
            video.load();
            video.play().catch(() => { });
        },
        _clearBackgroundVideo(video) {
            video.removeAttribute('src');
            video.load();
            this.backgroundVideoUrl = null;
        },
        _setVideoEnabled() {
            this.isVideo = true;
        },
        _setVideoDisabled() {
            this.isVideo = false;
        },
        _resetVideoInput(event) {
            event.target.value = '';
        },
        _setLocalStorageRolls() {
            const rollsJson = JSON.stringify(this.rolls);
            localStorage.setItem(ROLLS_JSON_KEY, rollsJson);
        },
        _advanceRoll() {
            if (this._isCurrentRollPassed()) {
                this._removeCurrentRoll();
            } else {
                this._moveCurrentRollToEnd();
            }
        },
        _isCurrentRollPassed() {
            return this.rolls[0].level >= ROLL_LEVEL_MAX;
        },
        _removeCurrentRoll() {
            this.rolls.shift();
        },
        _moveCurrentRollToEnd() {
            this.rolls.push(this.rolls.shift());
        },
        _getRollsFromLocalStorage() {
            return JSON.parse(localStorage.getItem(ROLLS_JSON_KEY) ?? this._getStartRollsJson());
        },
        _getStartRollsJson() {
            return JSON.stringify(shuffle(INITIAL_ROLLS));
        },
        _isPluginMode() {
            return new URLSearchParams(window.location.search).has('plugin');
        }
    };
};
