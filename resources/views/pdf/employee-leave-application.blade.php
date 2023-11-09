<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Example 1</title>

    <style>
        .clearfix:after {
            content: "";
            display: table;
            clear: both;
        }
        a {
            color: #5D6975;
            text-decoration: underline;
        }

        body {
            position: relative;
            /*width: 21cm;*/
            height: 29.7cm;
            margin: 0 auto;
            color: #001028;
            background: #FFFFFF;
            font-family: Arial, sans-serif;
            font-size: 12px;
            font-family: Arial;
        }

        header {
            padding: 10px 0;
            margin-bottom: 30px;
        }

        #logo {
            text-align: center;
            margin-bottom: 10px;
        }

        #logo img {
            width: 90px;
        }

        h1 {
            border-top: 1px solid  #5D6975;
            border-bottom: 1px solid  #5D6975;
            color: #5D6975;
            font-size: 2.4em;
            line-height: 1.4em;
            font-weight: normal;
            text-align: center;
            margin: 0 0 20px 0;
            background: #00ab55;
        {{--background: url({{$bg_logo}});--}}
}

        #project {
            float: left;
        }

        #project span {
            color: #5D6975;
            text-align: right;
            width: 52px;
            margin-right: 10px;
            display: inline-block;
            font-size: 0.8em;
        }

        #company {
            float: right;
            text-align: right;
        }

        #project div,
        #company div {
            white-space: nowrap;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            border-spacing: 0;
            margin-bottom: 20px;
        }

        table tr:nth-child(2n-1) td {
            background: #F5F5F5;
        }

        table th,
        table td {
            text-align: center;
        }

        table th {
            padding: 5px 20px;
            color: #5D6975;
            border-bottom: 1px solid #C1CED9;
            white-space: nowrap;
            font-weight: normal;
        }

        table .service,
        table .desc {
            text-align: left;
        }

        table td {
            padding: 20px;
            text-align: right;
        }

        table td.service,
        table td.desc {
            vertical-align: top;
        }

        table td.unit,
        table td.qty,
        table td.total {
            font-size: 1.2em;
        }

        table td.grand {
            border-top: 1px solid #5D6975;;
        }

        #notices .notice {
            color: #5D6975;
            font-size: 1.2em;
        }

        footer {
            color: #5D6975;
            width: 100%;
            height: 30px;
            position: absolute;
            bottom: 0;
            border-top: 1px solid #C1CED9;
            padding: 8px 0;
            text-align: center;
        }
    </style>
</head>
<body>
<header class="clearfix">
{{--    <div id="logo">--}}
{{--    {{dd($data)}}>--}}
{{--    </div>--}}
    <h1>Attendance Report : {{ $from }} - {{ $to }}</h1>
    @if(isset($data))
    <div id="project" class="clearfix">
        <div>{{$data[0]?->user?->first_name}}</div>
        <div>{{$data[0]?->user?->first_name}} {{ $data[0]->user?->last_name }}</div>
        <div>Gender : {{$data[0]?->user?->gender}}</div>
        <div>{{$data[0]?->user?->mobile}}</div>
        <div><a href="#">{{$data[0]?->user?->email}}</a></div>
    </div>
    <div id="company" class="clearfix">
        <div>Company : {{ $data[0]->user?->company?->name }}</div>
        <div>{{ $data[0]->user?->company?->address }} {{ $data[0]->user?->company?->post_code }} <br /> {{ $data[0]->user?->company?->state }}, {{ $data[0]->user?->company?->city }}</div>
        <div>{{ $data[0]->user?->company?->phone_no }}</div>
        <div><a href="#">{{ $data[0]->user?->company?->email }}</a></div>
    </div>
    @endif
</header>
<main>
    <table>
        <thead>
        <tr>
            <th class="desc">Leave Name</th>
            <th class="desc">Leave Approve Date</th>
            <th class="desc">From Date</th>
            <th class="desc">To Date</th>
            <th class="desc">Nod</th>
            <th class="desc">Reason</th>
        </tr>
        </thead>
        <tbody>
        @if($data)
            @foreach($data as $item)
                <tr>
                    <td class="desc">{{$item?->leavecategory?->name}}</td>
                    <td class="desc">{{$item?->approve_date}}</td>
                    <td class="desc">{{$item?->from_date}}</td>
                    <td class="desc">{{$item?->to_date}}</td>
                    <td class="desc">{{$item?->nods}}</td>
                    <td class="desc">{{$item?->reason}}</td>
                </tr>
            @endforeach
        @endif
        </tbody>
    </table>
</main>
</body>
</html>