import MainLayout from "../../Layout/Mainlayout";
import { usePage } from "@inertiajs/react";
function DepartmentAttendanceDateRangeWiseReport() {
    const { filename } = usePage().props;
    return (
        <>
            <div className="panel">
                {filename && filename.endsWith('.pdf') ? (
                    <iframe
                        src={`/pdfs/${filename}`}
                        title="PDF Preview"
                        width="100%"
                        height="800px"
                    ></iframe>
                ) : (
                    <p>No PDF available for this notice.</p>
                )}
            </div>

        </>
    );
}
DepartmentAttendanceDateRangeWiseReport.layout = (page) => (
    <MainLayout children={page} title="HR || Notice" />
);
export default DepartmentAttendanceDateRangeWiseReport;
