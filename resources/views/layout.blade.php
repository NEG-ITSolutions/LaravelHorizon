<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Meta Information -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="shortcut icon" href="{{ asset('/vendor/horizon/img/favicon.png') }}">

    <title>Horizon{{ config('app.name') ? ' - ' . config('app.name') : '' }}</title>

    <!-- Style sheets-->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:300,400,500,600" rel="stylesheet" />
    <link href="{{ asset(mix('app.css', 'vendor/horizon')) }}" rel="stylesheet" data-scheme="light">
    <link href="{{ asset(mix('app-dark.css', 'vendor/horizon')) }}" rel="stylesheet" data-scheme="dark">
</head>
<body>
    <div
        id="horizon"
        v-cloak
        data-assets-are-current="{{ $assetsAreCurrent }}"
        data-is-down-for-maintenance="{{ $isDownForMaintenance }}"
        data-app-name="{{ config('app.name') ? ' - ' . config('app.name') : '' }}">
    </div>

<!-- Global Horizon Object -->
<script>
    window.Horizon = @json($horizonScriptVariables);
</script>

<script src="{{asset(mix('app.js', 'vendor/horizon'))}}"></script>
</body>
</html>
