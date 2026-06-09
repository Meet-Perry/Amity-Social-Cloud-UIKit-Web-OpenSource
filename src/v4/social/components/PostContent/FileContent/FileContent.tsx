import type React from 'react';

import filesize from 'filesize';

import { Typography } from '~/v4/core/components';
import { useAmityElement } from '~/v4/core/hooks/uikit';
import useFile from '~/v4/core/hooks/useFile';

import styles from './FileContent.module.css';

type FileContentProps = {
  pageId?: string;
  componentId?: string;
  elementId?: string;
  posts: Amity.Post<'file'>[];
};

export const FileContent = ({
  posts,
  pageId = '*',
  componentId = '*',
  elementId = '*',
}: FileContentProps) => {
  const { themeStyles } = useAmityElement({ pageId, componentId, elementId });

  const filePosts = (posts ?? []).filter((post) => post?.dataType === 'file');

  if (filePosts.length === 0) return null;

  return (
    <div style={themeStyles} className={styles.fileContent}>
      {filePosts.map((post) => (
        <FileItem
          key={post.postId}
          fileId={post.data?.fileId}
          pageId={pageId}
          componentId={componentId}
        />
      ))}
    </div>
  );
};

const FileIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M13.5 2.75H6.5C5.80964 2.75 5.25 3.30964 5.25 4V20C5.25 20.6904 5.80964 21.25 6.5 21.25H17.5C18.1904 21.25 18.75 20.6904 18.75 20V8L13.5 2.75Z"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
    <path d="M13.25 3V8.25H18.5" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
  </svg>
);

type FileItemProps = {
  fileId?: string;
  pageId?: string;
  componentId?: string;
};

function FileItem({ fileId, pageId = '*', componentId = '*' }: FileItemProps) {
  const file = useFile(fileId);

  if (!file) return null;

  const name = file.attributes?.name ?? 'File';
  const size = Number(file.attributes?.size);

  return (
    <a
      href={file.fileUrl}
      download
      target="_blank"
      rel="noopener noreferrer"
      className={styles.fileContent__item}
      data-testid={`${pageId}/${componentId}/post_file`}
    >
      <span className={styles.fileContent__icon}>
        <FileIcon />
      </span>
      <span className={styles.fileContent__info}>
        <Typography.BodyBold as="span" className={styles.fileContent__name}>
          {name}
        </Typography.BodyBold>
        {!Number.isNaN(size) && size > 0 && (
          <Typography.Caption className={styles.fileContent__size}>
            {filesize(size, { base: 2 })}
          </Typography.Caption>
        )}
      </span>
    </a>
  );
}
