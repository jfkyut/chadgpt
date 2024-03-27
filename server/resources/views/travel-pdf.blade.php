<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
                /* Reset some default styles */
        ul, li, table, th, td {
            margin: 0;
            padding: 0;
            list-style: none;
            border: none;
        }

        body {
            font-family: 'Arial', sans-serif;
            font-size: 16px;
            line-height: 1.5;
            color: #000;
            background-color: #fff;
        }

        /* Section styles */
        section {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        /* General text styles */
        .text-relaxed {
            line-height: 1.75;
        }

        .text-gray-700 {
            color: #4a5568;
        }

        .uppercase {
            text-transform: uppercase;
        }

        .dark:text-gray-400 {
            color: #cbd5e0;
        }

        /* List styles */
        ul {
            margin-top: 1em;
            margin-bottom: 1em;
        }

        /* Table styles */
        table {
            width: 100%;
            border-collapse: collapse;
        }

        /* Table header styles */
        thead {
            background-color: #f5eff5;
        }

        .text-xs {
            font-size: 0.75rem;
        }

        /* Table row styles */
        tr {
            border-bottom: 1px solid #e2e8f0;
        }

        /* Table cell styles */
        th, td {
            padding: 0.75rem;
        }

        /* Day header styles */
        .text-xl {
            font-size: 1.25rem;
        }

        /* Day table styles */
        .relative {
            position: relative;
        }

        .overflow-x-auto {
            overflow-x: auto;
        }

        .shadow-md {
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        .sm\:rounded-lg {
            border-radius: 0.375rem;
        }

        .my-6 {
            margin-top: 1.5rem;
            margin-bottom: 1.5rem;
        }

        /* Table cell alignment */
        .text-left {
            text-align: left;
        }

        /* Hover styles */
        .hover\:bg-gray-50:hover {
            background-color: #f7fafc;
        }

        .dark:hover\:bg-gray-600:hover {
            background-color: #2d3748;
        }

        .w-\[20\%\] {
            width: 20%;
        }

        .w-\[30\%\] {
            width: 30%;
        }

        .sm\:rounded-lg {
            border-radius: 0.5rem;
        }

        .h1 {
            font-size: 1.25rem;
            line-height: 1.75rem;
            font-weight: 700;
            color: rgb(30, 58, 138);
            text-align: center;
        }

    </style>
    <title>{{ $travel['title'] }}</title>
</head>
<body>
    <div style="text-align: center;">
        <span class="h1 text-xl font-bold text-blue-900 mb-5" style="text-transform: uppercase;">{{ $travel['title'] }}</span>
        <br>
        <strong>VTASVP's AI Travel Itinerary Generator</strong>
    </div>
    {!! $travel['plan'] !!}
</body>
</html>
