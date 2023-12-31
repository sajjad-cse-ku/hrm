<!DOCTYPE html>
<html lang="en" dir="ltr">
    <link rel="icon" href="{{asset('favicon.png')}}" />
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])

    @inertiaHead
</head>

<body id="main">
    @inertia
</body>

</html>
