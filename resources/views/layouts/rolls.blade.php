<!DOCTYPE html>
<html lang="pl">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'English Rolls')</title>
    <script src="https://code.responsivevoice.org/responsivevoice.js?key=vFVsh7I0"></script>
    @vite(config('vite.entries.app'))
    <script src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js" defer></script>
</head>

<body class="rolls-body">
    <div class="rolls-layout-container">
        @yield('content')
    </div>
</body>

</html>
