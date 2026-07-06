import styled, { css } from 'styled-components';
import Modal from '~/core/components/Modal';
import Button, { PrimaryButton } from '~/core/components/Button';

/*
 * The confirm dialog reuses the shared v3 Modal, whose window background/text come
 * from the styled-components palette (frozen at light). Override them with the DS
 * colour tokens here so the dialog tracks light/dark themes. styled(Modal) forwards
 * this class onto the modal window, and — like DefaultOkButton overriding
 * PrimaryButton below — its rules are inserted after the base and win at equal
 * specificity.
 */
export const ConfirmModal = styled(Modal)`
  max-width: 360px;
  background: var(--asc-color-background-default);
  color: var(--asc-color-base-default);
`;

export const ConfirmModalContent = styled.div`
  padding: 1rem 1rem 0.75rem 1rem;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const transparentFocus = css`
  &:focus,
  &:focus-visible {
    border-color: transparent !important;
    box-shadow: none !important;
    outline: none;
  }
`;

export const DefaultOkButton = styled(PrimaryButton)`
  color: var(--asc-color-white);
  background: var(--asc-color-alert-default);
  border-radius: 0.25rem;
  &:hover {
    background: var(--asc-color-alert-default);
  }
  ${transparentFocus}
`;
export const DefaultCancelButton = styled(Button)`
  margin-right: 10px;
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
