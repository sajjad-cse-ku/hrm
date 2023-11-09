import React from 'react';

function PaginationControls({ paginationInfo, setPage, handleGoToPage }) {
    return (
        <div className="cus-dt-footer mt-5">
            <div className="flex justify-between items-center">
                <div className="cus-dt-entries-count">
                    <p>Showing <span>{paginationInfo.from}</span> to <span>{paginationInfo.to}</span> of <span>{paginationInfo.total}</span> entries</p>
                </div>
                <div className="cus-dt-pagination flex justify-between items-center">
                    {paginationInfo?.links && paginationInfo?.links.map((link, index) => (
                        <button
                            className={
                                Number(link.label) === paginationInfo?.current_page
                                    ? 'cus-dt-pagination-btn active rounded-full'
                                    : 'cus-dt-pagination-btn rounded-full'
                            }
                            key={index}
                            onClick={() => {
                                if (link.label !== null) {
                                    const pageNumber = link?.url?.split('=').pop();
                                    handleGoToPage(Number(pageNumber));
                                }
                            }}
                        >
                            {
                                link.url === null ? (index === 0 || index === paginationInfo.links.length - 1 ? <span className="disable" dangerouslySetInnerHTML={{ __html: link.label }} /> : '...') : <span className="without-active-showing" dangerouslySetInnerHTML={{ __html: link.label }} />
                            }
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PaginationControls;
