import clsx from 'clsx';
import React from 'react';
import CloseIcon from '~/v4/icons/Close';
import { useAmityElement } from '~/v4/core/hooks/uikit';
import { IconComponent } from '~/v4/core/IconComponent';
import { Button, ButtonProps } from '~/v4/core/natives/Button';
import styles from './ClearButton.module.css';

type ClearButtonProps = {
  pageId?: string;
  componentId?: string;
  imgClassName?: string;
  buttonClassName?: string;
  defaultClassName?: string;
  onPress?: ButtonProps['onPress'];
};

export const ClearButton = ({
  pageId = '*',
  imgClassName,
  buttonClassName,
  defaultClassName,
  componentId = '*',
  onPress,
}: ClearButtonProps) => {
  const elementId = 'clear_button';
  const { accessibilityId, config, defaultConfig, isExcluded, uiReference, themeStyles } =
    useAmityElement({
      pageId,
      componentId,
      elementId,
    });

  if (isExcluded) return null;

  return (
    <Button
      onPress={onPress}
      style={themeStyles}
      aria-label="Click to close"
      data-testid={accessibilityId}
      className={clsx(styles.clearButton, buttonClassName)}
    >
      <IconComponent
        configIconName={config.icon}
        defaultIconName={defaultConfig.icon}
        defaultIcon={() => <CloseIcon className={defaultClassName} />}
        imgIcon={() => <img src={config.icon} alt={uiReference} className={imgClassName} />}
      />
    </Button>
  );
};
