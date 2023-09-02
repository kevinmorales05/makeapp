"use client"
import Link from "next/link";
import { ReactNode } from "react";
import { IconHome } from "./IconHome";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";

// define the Props
export type CrumbItem = {
  label: ReactNode; // e.g., Python
  path: string; // e.g., /development/programming-languages/python
};

export type BreadcrumbsProps = {
  items: CrumbItem[];
};

const Breadcrumbs = () => {
  const pathname = usePathname()
  const locale = useLocale()
  const splitPathnames = (pathname: string | null, locale: string) => {
    if (pathname === null) {
      return [{ label: locale, path: `/${locale}` }]
    }
    const longPath = pathname
    const pathStrSplit = longPath.split('/')
    const splitted: any = []

    longPath.split('/').forEach(path => {

      const last = pathStrSplit.pop()
      if (last !== "" && last !== locale) {
        splitted.push({
          label: last,
          path: pathStrSplit.join("/") + `/${last}`
        })
      }
      if (last === locale) {
        splitted.push({
          label: <IconHome src="/home.svg" height={24} width={24} alt="home icon" />,
          path: pathStrSplit.join("/") || `/${locale}`
        })
      }
    });

    return splitted.reverse()
  }

  return (
    <div className="flex gap-2 items-start">
      {splitPathnames(pathname, locale).map((crumb: CrumbItem, i: number) => {
        const isLastItem = i === splitPathnames(pathname, locale).length - 1;
        if (!isLastItem) {
          return (
            <>
              <Link
                href={crumb.path}
                key={i}
                className="text-indigo-500 hover:text-indigo-400 hover:underline"
              >
                {crumb.label}
              </Link>
              {/* separator */}
              <span> / </span>
            </>
          );
        } else {
          return crumb.label;
        }
      })}
    </div>
  );
};
export default Breadcrumbs;
