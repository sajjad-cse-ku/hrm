import MainLayout from "../../Layout/Mainlayout";
import { Link, router, usePage } from "@inertiajs/react";
function Index() {
    const { notice } = usePage().props;
    return (
        <>
            <div className="panel">
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">
                        Send by - {notice?.sender} {notice?.title} : {notice?.notice_date}
                    </h5>
                </div>

                {notice?.file_path ? (
                    notice.file_path.endsWith('.pdf') ? (
                        <iframe
                            src={`/storage/notice/${notice.file_path}`}
                            title="PDF Preview"
                            width="100%"
                            height="700px"
                        ></iframe>
                    ) : (
                        <img
                            src={`/storage/notice/${notice.file_path}`}
                            alt={notice.file_path}
                        />
                    )
                ) : (
                    <p>No file available.</p>
                )}
            </div>

        </>
    );
}
Index.layout = (page) => (
    <MainLayout children={page} title="HR || Notice" />
);
export default Index;
