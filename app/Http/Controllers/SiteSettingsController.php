<?php

namespace App\Http\Controllers;

use App\Models\SiteSettings;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SiteSettingsController extends Controller
{
    public function siteSettings(){
        $result = SiteSettings::first();
        return Inertia::render('Module/SiteSettings/Index',['result'=>$result]);
    }
    public function siteSettingsUpdate(Request $request) {
        $siteSettings = SiteSettings::first();
        if ($siteSettings) {
            $siteSettings->update([
                'sick' => (int) floor(365/$request->sick),
                'casual' => (int) floor(365/$request->casual),
                'extra_time' => $request->extra_time,
                'ip' => $request->ip,
                'port' => $request->port,
                'protocol' => $request->protocol,
            ]);
            return back()->with('success', 'Site settings updated successfully');
        } else {
            return back()->with('error', 'Data Does not Insert');
        }
    }

}
