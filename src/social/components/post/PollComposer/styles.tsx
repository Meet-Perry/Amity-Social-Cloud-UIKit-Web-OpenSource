import type React from 'react';

import { ErrorMessage as FormErrorMessage } from '@hookform/error-message';
import styled, { css } from 'styled-components';

import Button from '~/core/components/Button';
import InputText from '~/core/components/InputText';
import Select from '~/core/components/Select';
import { CircleRemove } from '~/icons';

const ErrorMessageWrapper = styled.div`
  margin-top: 8px;
  color: var(--asc-color-alert-default);
  ${({ theme }) => theme.typography.caption}
`;

/*
 * Suppress the focus highlight on the poll dialog's fields and buttons: transparent
 * ring (box-shadow) and border on focus. border-color !important is needed to beat
 * each element's own !important border shorthand; only the colour changes, so the
 * 1px border keeps its box and nothing shifts on focus.
 */
const transparentFocus = css`
  &:focus,
  &:focus-visible,
  &:focus-within {
    border-color: transparent !important;
    box-shadow: none !important;
    outline: none;
  }
`;

/*
 * Scopes the shared v3 Modal chrome to the DS colour tokens so the poll dialog
 * tracks light/dark themes (the styled-components palette is frozen at light).
 * Keyed on the dialog's own data-testid so no other v3 modal is affected. The
 * attribute selector out-specifies the Modal's own class rules, so no !important
 * is needed here.
 */
export const ThemedPollModal = styled.div`
  [data-testid='poll-composer-modal'] {
    background: var(--asc-color-background-default);
    color: var(--asc-color-base-default);
  }

  /* Recolour the Header bottom-border and Footer top-border (no-op on Content). */
  [data-testid='poll-composer-modal'] > div {
    border-color: var(--asc-color-base-shade4);
  }
`;

export const PollComposerContainer = styled.div``;

export const Form = styled.form``;

export const OptionsComposerContainer = styled.div``;

export const OptionItemContainer = styled.div`
  margin-bottom: 12px;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const MentionTextInput = styled(InputText)`
  ${({ theme }) => theme.typography.global};
  outline: none;
  /*
   * InputText forwards its className to the inner Container, so these reach the
   * real element. Override the kit's frozen-light palette with DS tokens so the
   * question field tracks light/dark themes (see Creator/styles.tsx precedent).
   */
  background: color-mix(
    in srgb,
    var(--color-background-surface-subtle) calc(var(--tw-bg-opacity) * 100%),
    transparent
  );
  border: 1px solid
    color-mix(in srgb, var(--color-edge) calc(var(--tw-border-opacity) * 100%), transparent) !important;

  textarea {
    /* !important: beats the kit InputText's own textarea colour, which matches
     * this rule at equal specificity so insertion order alone can't be trusted. */
    color: color-mix(
      in srgb,
      var(--color-foreground-primary) calc(var(--tw-text-opacity) * 100%),
      transparent
    ) !important;
    ${transparentFocus}
  }
`;

export const TextInput = styled.input`
  ${({ theme }) => theme.typography.global};
  border-radius: 4px;
  border: 1px solid
    color-mix(in srgb, var(--color-edge) calc(var(--tw-border-opacity) * 100%), transparent) !important;
  padding: 10px 12px;
  outline: none;
  ${transparentFocus}
`;

export const OptionInput = styled(TextInput)`
  background: color-mix(
    in srgb,
    var(--color-background-surface-subtle) calc(var(--tw-bg-opacity) * 100%),
    transparent
  );
  width: 100%;
  padding-right: 60px;
  color: color-mix(
    in srgb,
    var(--color-foreground-primary) calc(var(--tw-text-opacity) * 100%),
    transparent
  );
`;

export const CloseIcon = styled(CircleRemove)``;

export const CloseButton = styled(Button)`
  background: transparent;
  border: none;
  outline: none;
`;

export const FormBlockBody = styled.div`
  padding: 20px 16px 16px;
`;

export const FormBlockContainer = styled.div``;

export const Field = styled.div<{ horizontal?: boolean; separate?: boolean }>`
  display: flex;
  flex-direction: column;
  ${({ horizontal }) => horizontal && `flex-direction: row`};
  ${({ separate }) =>
    separate &&
    `
    border-top: 1px solid var(--asc-color-base-shade4);
    padding-top: 20px;
  `};
  margin-bottom: 20px;
`;

export const FormBody = styled.div``;

export const ErrorMessage = (props: Omit<React.ComponentProps<typeof FormErrorMessage>, 'as'>) => (
  <FormErrorMessage as={ErrorMessageWrapper} {...props} />
);

export const Footer = styled.div<{ edit?: boolean }>`
  border-top: 1px solid var(--asc-color-base-shade4);
  padding: ${({ edit }) => (edit ? `12px 0` : `12px 16px`)};
  display: flex;
  justify-content: ${({ edit }) => (edit ? 'flex-start' : 'flex-end')};
`;

export const Label = styled.label`
  ${({ theme }) => theme.typography.bodyBold};
  &.required {
    &::after {
      color: var(--asc-color-alert-default);
      content: ' *';
    }
  }
`;

export const LabelContainer = styled.div`
  width: 700px;
  margin-right: 20px;
`;

export const LabelWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 8px;
`;

export const ControllerContainer = styled.div`
  width: 100%;
`;

export const FieldContainer = styled.div`
  display: flex;
  width: 100%;
`;

/*
 * Themed stand-in for the core DefaultButton (which hardcodes #fff bg / #e3e4e8
 * border). Used for Cancel and "Add option" so they track light/dark themes.
 */
export const SecondaryButton = styled(Button)`
  background-color: transparent;
  border: 1px solid var(--asc-color-base-shade4);
  border-radius: 0.25rem;
  color: color-mix(
    in srgb,
    var(--color-foreground-primary) calc(var(--tw-text-opacity) * 100%),
    transparent
  );
  &:hover {
    color: color-mix(
      in srgb,
      var(--color-foreground-primary) calc(var(--tw-text-opacity) * 100%),
      transparent
    );
  }
  ${transparentFocus}
`;

/*
 * Matches the v4 PostComposer "Post" CTA (AriaButton variant="text" color="primary"):
 * a borderless, transparent, blue-text button that tracks the DS primary tokens in
 * both light and dark themes, rather than the filled primary button used before.
 */
export const SubmitButton = styled.button.attrs<{ edit?: boolean }>({
  type: 'submit',
})`
  ${({ theme }) => theme.typography.body};
  font-weight: normal;
  background-color: color-mix(
    in srgb,
    var(--color-action-primary) calc(var(--tw-bg-opacity) * 100%),
    transparent
  );
  border: 1px solid
    color-mix(
      in srgb,
      var(--color-action-primary-border) calc(var(--tw-border-opacity) * 100%),
      transparent
    );
  outline: none;
  cursor: pointer;
  border-radius: 0.25rem;
  padding: 10px 16px;
  margin-left: 12px;
  color: color-mix(
    in srgb,
    var(--color-action-primary-text) calc(var(--tw-text-opacity) * 100%),
    transparent
  );

  &:hover:not(:disabled) {
    color: var(--asc-color-primary-shade1);
  }

  &:disabled {
    cursor: not-allowed;
    color: var(--color-action-primary-text-disabled);
    background-color: var(--color-action-primary-disabled);
  }

  ${transparentFocus}

  ${({ edit }) =>
    edit &&
    css`
      min-width: 100px;
      margin-left: 0;
    `};
`;

/*
 * The answer-type Select renders a <button> trigger. Restyle it to match the poll
 * inputs (surface-subtle fill, edge border, foreground text, 4px radius, no focus
 * highlight) instead of the kit's frozen-light DefaultTrigger.
 */
export const StyledSelect = styled(Select)`
  button {
    width: 100%;
    border-radius: 4px;
    padding: 10px 12px;
    background: color-mix(
      in srgb,
      var(--color-background-surface-subtle) calc(var(--tw-bg-opacity) * 100%),
      transparent
    );
    border: 1px solid
      color-mix(in srgb, var(--color-edge) calc(var(--tw-border-opacity) * 100%), transparent) !important;
    color: color-mix(
      in srgb,
      var(--color-foreground-primary) calc(var(--tw-text-opacity) * 100%),
      transparent
    );
    ${transparentFocus}
  }

  /*
   * Dropdown popup. It renders inline inside the Select (not portaled), so these
   * descendant rules reach it. The Menu is the visible panel (parent of the menu
   * items); its opaque DS surface fill covers the Frame's frozen-light background
   * behind it. Items keyed on their stable data-testid suffix so the empty
   * anchor (no data-testid passed) still matches.
   */
  div:has(> [data-testid$='select-menu-item']) {
    background: color-mix(
      in srgb,
      var(--color-background-surface) calc(var(--tw-bg-opacity) * 100%),
      transparent
    );
    border: 0;
  }

  /*
   * The Frame panel (parent of the Menu) ships the kit's frozen white background,
   * which peeks around the Menu as a white ring. Clear it so only the Menu's DS
   * surface shows; the Frame's drop-shadow is unaffected.
   */
  div:has(> div > [data-testid$='select-menu-item']) {
    background: transparent !important;
  }

  [data-testid$='select-menu-item'] {
    color: color-mix(
      in srgb,
      var(--color-foreground-primary) calc(var(--tw-text-opacity) * 100%),
      transparent
    );
  }

  [data-testid$='select-menu-item']:hover {
    background: color-mix(
      in srgb,
      var(--color-background-surface-subtle) calc(var(--tw-bg-opacity) * 100%),
      transparent
    ) !important;
  }
`;

export const Counter = styled.div`
  margin-left: auto;
  color: var(--asc-color-base-shade1);
  ${({ theme }) => theme.typography.caption}
`;

export const OptionInputContainer = styled.div`
  position: relative;
  width: 100%;

  ${Counter} {
    position: absolute;
    top: 14px;
    right: 8px;
  }
`;

export const TitleContainer = styled.div`
  margin-bottom: 8px;
`;
