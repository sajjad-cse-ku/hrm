<?php

namespace App\Http\Middleware;

use App\Models\SiteSettings;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function version(Request $request): ?string
    {
        if (file_exists($manifest = public_path('build/manifest.json'))) {
            return md5_file($manifest);
        }

        return parent::version($request);
    }

    /**
     * Defines the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
                'warning' => fn () => $request->session()->get('warning'),
                'info' => fn () => $request->session()->get('info'),
            ],
            'base_url' => url('/'),
            'auth' => fn () => $request->user()
                ? $request->user()->only('id', 'first_name', 'last_name','email','avatar')
                : null,
            'theme'=>"default",
            'site_settings' => SiteSettings::first(),
            'permissions' => checkPermissions(),
            'count_notice' => UnreadalbeNotice(),
            'count_task'=>CountTask(),
            'count_late'=>CountLate(),
//            'leave_acknowledge'=>'',
//            'leave_recommend'=>'',
//            'leave_approval'=>'',
        ]);
    }
}