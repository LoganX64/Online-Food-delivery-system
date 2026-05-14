import { Card, CardContent } from "@/components/ui/card";
import React from "react";

export interface FoodCardProps {
  image: string;
  title: string;
  subtitle?: string;
  // Image Overlays
  topLeftBadge?: React.ReactNode;
  topRightBadge?: React.ReactNode;
  // Content right of Title/Subtitle
  contentRight?: React.ReactNode;
  // Footer content
  footerLeft?: React.ReactNode;
  footerRight?: React.ReactNode;
  footerFull?: React.ReactNode;
  // Optional onClick
  onClick?: () => void;
  // Container class name overrides
  className?: string;
}

export function FoodCard({
  image,
  title,
  subtitle,
  topLeftBadge,
  topRightBadge,
  contentRight,
  footerLeft,
  footerRight,
  footerFull,
  onClick,
  className = ""
}: FoodCardProps) {
  return (
    <Card 
      onClick={onClick}
      className={`group overflow-hidden border border-muted/50 shadow-sm hover:shadow-md transition-all duration-300 w-full p-0 flex flex-col gap-0 ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Image Container - Aspect 4/3 */}
      <div className="relative aspect-[4/3] overflow-hidden w-full bg-muted/20">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {topLeftBadge && (
          <div className="absolute top-0 left-0 z-10">
            {topLeftBadge}
          </div>
        )}

        {topRightBadge && (
          <div className="absolute top-3 right-3 z-10">
            {topRightBadge}
          </div>
        )}
      </div>

      {/* Content */}
      <CardContent className="p-4 flex flex-col flex-1 gap-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-tight truncate">
              {title}
            </h3>
            {subtitle && (
              <p className="text-muted-foreground text-[12px] font-semibold mt-1 truncate">
                {subtitle}
              </p>
            )}
          </div>
          
          {contentRight && (
            <div className="shrink-0">
              {contentRight}
            </div>
          )}
        </div>

        {/* Footer */}
        {footerFull ? (
          <div className="pt-3 border-t border-muted/30 mt-auto">
            {footerFull}
          </div>
        ) : (footerLeft || footerRight) ? (
          <div className="flex items-center justify-between pt-3 border-t border-muted/30 mt-auto">
            <div className="font-bold text-lg text-foreground">
              {footerLeft}
            </div>
            <div>
              {footerRight}
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
