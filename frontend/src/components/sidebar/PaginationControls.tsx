import React from "react";

interface PaginationControlsProps {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  page,
  setPage,
  totalPages,
}) => {
  if (totalPages <= 1) return null;
  return (
    <>
      <div className="divider" />
      <div className="flex justify-center py-2">
        <div className="join">
          <button
            className="join-item btn btn-sm"
            disabled={page <= 1}
            onClick={() => setPage(Math.max(1, page - 1))}
          >
            «
          </button>
          {(() => {
            const window = 1;
            const pages = [];
            pages.push(1);
            if (page - window > 2) {
              pages.push("left-ellipsis");
            }
            for (
              let i = Math.max(2, page - window);
              i <= Math.min(totalPages - 1, page + window);
              i++
            ) {
              pages.push(i);
            }
            if (page + window < totalPages - 1) {
              pages.push("right-ellipsis");
            }
            if (totalPages > 1) {
              pages.push(totalPages);
            }
            return pages.map((p, idx) => {
              if (p === "left-ellipsis" || p === "right-ellipsis") {
                return (
                  <button
                    key={p + idx}
                    className="join-item btn btn-sm btn-disabled"
                  >
                    ...
                  </button>
                );
              }
              return (
                <button
                  key={p}
                  className={`join-item btn btn-sm${
                    page === p ? " btn-active" : ""
                  }`}
                  onClick={() => setPage(Number(p))}
                >
                  {p}
                </button>
              );
            });
          })()}
          <button
            className="join-item btn btn-sm"
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
          >
            »
          </button>
        </div>
      </div>
    </>
  );
};

export default PaginationControls;
