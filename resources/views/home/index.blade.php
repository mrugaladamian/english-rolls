@extends('layouts.home')
@section('title', 'English Rolls')
@section('content')
    <main class="home-page">
        <section class="home-hero">
            <div class="home-copy">
                <p class="home-kicker">English Rolls</p>
                <h1 class="home-title">Prosta nauka angielskich słówek</h1>
                <p class="home-lead">
                    Ćwicz krótkie słowa i zwroty w szybkim rytmie: najpierw widzisz polskie znaczenie,
                    potem odkrywasz angielską odpowiedź i wymowę.
                </p>
                <a class="home-start-link" href="{{ route('rolls.index') }}">Rozpocznij naukę</a>
            </div>
            <div class="home-preview" data-home-preview>
                <script type="application/json" data-home-preview-rolls>
                    @json($previewRolls)
                </script>
                <span class="home-preview-translation" data-home-preview-pl>{{ $previewRolls[0]['pl'] }}</span>
                <span class="home-preview-word" data-home-preview-en>{{ $previewRolls[0]['en'] }}</span>
                <span class="home-preview-phonetic" data-home-preview-phonetic>{{ $previewRolls[0]['phonetic'] }}</span>
            </div>
        </section>

        <section class="home-sections">
            <article class="home-info-item">
                <h2 class="home-info-title">Jak wygląda ćwiczenie</h2>
                <p class="home-info-text">
                    Klikasz ekran, żeby przejść od polskiego hasła do angielskiej odpowiedzi.
                    Kolejne kliknięcie pokazuje następne słówko.
                </p>
            </article>
            <article class="home-info-item">
                <h2 class="home-info-title">Kiedy słówko jest opanowane</h2>
                <p class="home-info-text">
                    Słówko wypada z sesji, gdy oznaczysz je jako znane za pierwszym razem albo gdy
                    potwierdzisz je trzy razy z rzędu.
                </p>
            </article>
            <article class="home-info-item">
                <h2 class="home-info-title">Wymowa i skupienie</h2>
                <p class="home-info-text">
                    Ikona głośnika włącza wymowę, a opcjonalne wideo w tle pozwala dopasować atmosferę
                    nauki do własnego rytmu.
                </p>
            </article>
        </section>
    </main>
@endsection
