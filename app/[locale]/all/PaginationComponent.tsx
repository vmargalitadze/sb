"use client";

import React, { FC, useCallback } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  pageCount: number;
}

interface PaginationArrowProps {
  direction: "left" | "right";
  onClick: () => void;
  isDisabled: boolean;
}

const PaginationArrow: FC<PaginationArrowProps> = React.memo(
  ({ direction, onClick, isDisabled }) => {
    const isLeft = direction === "left";

    return (
      <Button
        onClick={onClick}
        className="bg-gray-100 cursor-pointer text-gray-500 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label={isLeft ? "Previous page" : "Next page"}
        disabled={isDisabled}
      >
        {isLeft ? "«" : "»"}
      </Button>
    );
  }
);

// ✅ Fix ESLint warning
PaginationArrow.displayName = "PaginationArrow";

const PaginationComponent: FC<PaginationProps> = ({ pageCount }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = useCallback(
    (pageNumber: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", pageNumber.toString());
      return `${pathname}?${params.toString()}`;
    },
    [pathname, searchParams]
  );

  const goToPage = useCallback(
    (pageNumber: number) => {
      if (pageNumber !== currentPage && pageNumber > 0 && pageNumber <= pageCount) {
        router.push(createPageURL(pageNumber));
      }
    },
    [currentPage, createPageURL, pageCount, router]
  );

  return (
    <div className="flex justify-center cursor-pointer items-center gap-2 mt-8">
      <PaginationArrow
        direction="left"
        onClick={() => goToPage(currentPage - 1)}
        isDisabled={currentPage <= 1}
      />
      <span className="p-2 font-semibold text-gray-500">
        გვერდი {currentPage}
      </span>
      <PaginationArrow
        direction="right"
        onClick={() => goToPage(currentPage + 1)}
        isDisabled={currentPage >= pageCount}
      />
    </div>
  );
};

export default React.memo(PaginationComponent);
