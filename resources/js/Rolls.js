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
        videoJumpText: '',
        videoJumpTimeout: null,
        init() {
            this.rolls = this._getRollsFromLocalStorage();
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
        resetRolls() {
            localStorage.removeItem(ROLLS_JSON_KEY);
            this.init();
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
            const hasSwipeStartPosition = this.swipeStartPosition !== null;
            return hasSwipeStartPosition;
        },
        _handleSwipe(swipePosition, video) {
            if (this._canSwipeVideo(video)) {
                this._swipeVideo(swipePosition, video);
            }
        },
        _canSwipeVideo(video) {
            const canSwipeVideo = this._isVideoEnabled() && video;
            return canSwipeVideo;
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
            clearTimeout(this.videoJumpTimeout);
            this.videoJumpTimeout = setTimeout(() => {
                this.videoJumpText = '';
            }, VIDEO_JUMP_MESSAGE_TIMEOUT);
        },
        _getSwipeDirectionSign(swipePosition) {
            const swipeDirectionSign = this._isSwipeRight(swipePosition) ? '+' : '-';
            return swipeDirectionSign;
        },
        _getSwipeVideoTimeJump(swipePosition) {
            let videoTimeJump = VIDEO_SHORT_TIME_JUMP;
            if (this._isLongSwipe(swipePosition)) {
                videoTimeJump = VIDEO_LONG_TIME_JUMP;
            }
            return videoTimeJump;
        },
        _isLongSwipe(swipePosition) {
            const isLongSwipe = Math.abs(swipePosition) > SWIPE_LONG_DISTANCE;
            return isLongSwipe;
        },
        _isSwipeRight(swipePosition) {
            const isSwipeRight = swipePosition > SWIPE_MIN_DISTANCE;
            return isSwipeRight;
        },
        _isSwipeLeft(swipePosition) {
            const isSwipeLeft = swipePosition < -SWIPE_MIN_DISTANCE;
            return isSwipeLeft;
        },
        _shouldResetRolls() {
            const shouldResetRolls = this.resetRollsLevel++ === RESET_ROLLS_LEVEL;
            return shouldResetRolls;
        },
        _canLoadBackgroundVideo(file, video) {
            const canLoadBackgroundVideo = file && video;
            return canLoadBackgroundVideo;
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
            const isCurrentRollPassed = this.rolls[0].level >= ROLL_LEVEL_MAX;
            return isCurrentRollPassed;
        },
        _removeCurrentRoll() {
            this.rolls.shift();
        },
        _moveCurrentRollToEnd() {
            this.rolls.push(this.rolls.shift());
        },
        _getRollsFromLocalStorage() {
            const rollsJson = localStorage.getItem(ROLLS_JSON_KEY) ?? this._getStartRollsJson();
            const rolls = JSON.parse(rollsJson);
            return rolls;
        },
        _getStartRollsJson() {
            const rolls = shuffle(INITIAL_ROLLS);
            return JSON.stringify(rolls);
        }
    };
};
