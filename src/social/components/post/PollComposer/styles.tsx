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
  background: var(--asc-color-base-shade4) !important;
  border: 1px solid var(--asc-color-base-shade4) !important;

  textarea {
    color: var(--asc-color-base-default) !important;
  }

  &:focus-within {
    border-color: var(--asc-color-primary-default) !important;
  }
`;

export const TextInput = styled.input`
  ${({ theme }) => theme.typography.global};
  border-radius: 4px;
  border: 1px solid var(--asc-color-base-shade4);
  padding: 10px 12px;
  outline: none;
  &:focus-within {
    border-color: var(--asc-color-primary-default);
  }
`;

export const OptionInput = styled(TextInput)`
  background: var(--asc-color-base-shade4);
  width: 100%;
  padding-right: 60px;
  color: var(--asc-color-base-default);
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
  background-color: var(--asc-color-background-default);
  border: 1px solid var(--asc-color-base-shade4);
  color: var(--asc-color-base-default);
  &:hover {
    color: var(--asc-color-base-default);
  }
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
  background-color: var(--color-action-primary);
  border: none;
  outline: none;
  cursor: pointer;
  padding: 10px 16px;
  margin-left: 12px;
  color: var(--color-action-primary-text);

  &:hover:not(:disabled) {
    color: var(--asc-color-primary-shade1);
  }

  &:disabled {
    cursor: not-allowed;
    color: var(--color-action-primary-text-disabled);
    background-color: var(--color-action-primary-disabled);
  }

  ${({ edit }) =>
    edit &&
    css`
      min-width: 100px;
      margin-left: 0;
    `};
`;

export const StyledSelect = styled(Select)`
  button {
    width: 100%;
    color: var(--asc-color-base-default);
    border-color: var(--asc-color-base-shade4);
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
