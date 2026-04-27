import React from "react";

// Blog Card Skeleton
export const BlogCardSkeleton = () => {
  return (
    <div className="flex flex-col rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm animate-pulse">
      {/* Image skeleton */}
      <div className="aspect-video bg-gray-200"></div>
      
      {/* Content skeleton */}
      <div className="flex flex-col gap-3 p-4">
        {/* Category badge skeleton */}
        <div className="w-20 h-5 bg-gray-200 rounded-full"></div>
        
        {/* Title skeleton */}
        <div className="space-y-2">
          <div className="w-full h-4 bg-gray-200 rounded"></div>
          <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
        </div>
        
        {/* Description skeleton */}
        <div className="space-y-1">
          <div className="w-full h-3 bg-gray-200 rounded"></div>
          <div className="w-full h-3 bg-gray-200 rounded"></div>
          <div className="w-1/2 h-3 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

// Blog List Skeleton
export const BlogListSkeleton = () => {
  return (
    <section className="py-16 px-4">
      {/* Header skeleton */}
      <div className="text-center mb-10">
        <div className="w-64 h-8 bg-gray-200 rounded mx-auto mb-2 animate-pulse"></div>
        <div className="w-96 h-4 bg-gray-200 rounded mx-auto animate-pulse"></div>
      </div>

      {/* Filter pills skeleton */}
      <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="w-20 h-8 bg-gray-200 rounded-full animate-pulse"></div>
        ))}
      </div>

      {/* Blog grid skeleton */}
      <div className="w-[88%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <BlogCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
};

// Blog Detail Skeleton
export const BlogDetailSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-pulse">
      {/* Header */}
      <div className="mb-8">
        <div className="w-20 h-6 bg-gray-200 rounded-full mb-4"></div>
        <div className="w-full h-10 bg-gray-200 rounded mb-4"></div>
        <div className="w-3/4 h-10 bg-gray-200 rounded mb-6"></div>
        <div className="w-48 h-4 bg-gray-200 rounded"></div>
      </div>

      {/* Image */}
      <div className="w-full h-96 bg-gray-200 rounded-lg mb-8"></div>

      {/* Content */}
      <div className="space-y-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="space-y-2">
            <div className="w-full h-4 bg-gray-200 rounded"></div>
            <div className="w-full h-4 bg-gray-200 rounded"></div>
            <div className="w-2/3 h-4 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Hero Skeleton
export const HeroSkeleton = () => {
  return (
    <div className="relative overflow-hidden bg-hero flex items-center flex-col justify-center gap-8 animate-pulse">
      <div className="w-48 h-8 bg-gray-200 rounded-full"></div>
      <div className="space-y-4 text-center">
        <div className="w-96 h-12 bg-gray-200 rounded mx-auto"></div>
        <div className="w-80 h-12 bg-gray-200 rounded mx-auto"></div>
      </div>
      <div className="w-[480px] h-4 bg-gray-200 rounded"></div>
      <div className="w-[480px] h-12 bg-gray-200 rounded-xl"></div>
    </div>
  );
};

// General Page Skeleton
export const PageSkeleton = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSkeleton />
      <BlogListSkeleton />
    </div>
  );
};

export default {
  BlogCardSkeleton,
  BlogListSkeleton,
  BlogDetailSkeleton,
  HeroSkeleton,
  PageSkeleton,
};