interface RichTextRendererProps {
  content: string;
}

export default function RichTextRenderer({ content }: RichTextRendererProps) {
  return (
    <div
      className="mx-auto max-w-[720px] [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-midnight [&_h2]:mt-10 [&_h2]:mb-4
        [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-midnight [&_h3]:mt-8 [&_h3]:mb-3
        [&_p]:text-gray-800 [&_p]:leading-relaxed [&_p]:mb-4
        [&_blockquote]:border-s-4 [&_blockquote]:border-ruby [&_blockquote]:bg-off-white [&_blockquote]:ps-6 [&_blockquote]:py-4 [&_blockquote]:my-6 [&_blockquote]:rounded-e-lg [&_blockquote]:italic [&_blockquote]:text-gray-600
        [&_ul]:list-disc [&_ul]:ps-6 [&_ul]:mb-4 [&_ul]:text-gray-800 [&_ul]:space-y-2
        [&_ol]:list-decimal [&_ol]:ps-6 [&_ol]:mb-4 [&_ol]:text-gray-800 [&_ol]:space-y-2
        [&_img]:rounded-2xl [&_img]:my-6 [&_img]:w-full
        [&_pre]:bg-gray-800 [&_pre]:text-off-white [&_pre]:rounded-xl [&_pre]:p-4 [&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:text-sm
        [&_code]:bg-gray-100 [&_code]:text-ruby [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm
        [&_pre_code]:bg-transparent [&_pre_code]:text-off-white [&_pre_code]:px-0 [&_pre_code]:py-0"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
