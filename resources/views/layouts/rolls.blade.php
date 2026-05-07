<!DOCTYPE html>
<html lang="pl">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'English Rolls')</title>
    @vite(['resources/css/app.css', 'resources/js/constants.js', 'resources/js/utils.js', 'resources/js/app.js', 'resources/js/rolls.js'])
    <script src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js" defer></script>
</head>

<body class="min-h-screen flex items-center justify-center">
    <div class="w-full max-w-lg mx-auto px-6">
        @yield('content')
    </div>
</body>

</html>
