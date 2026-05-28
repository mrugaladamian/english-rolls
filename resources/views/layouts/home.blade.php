<!DOCTYPE html>
<html lang="pl">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'English Rolls')</title>
    <link rel="icon" type="image/png" href="{{ asset('favicon.png') }}">
    @vite(config('vite.entries.app'))
</head>

<body class="home-body">
    @yield('content')
</body>

</html>
