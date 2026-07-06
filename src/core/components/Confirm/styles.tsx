import styled from 'styled-components';
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

export const DefaultOkButton = styled(PrimaryButton)`
  color: var(--asc-color-white);
  background: var(--asc-color-alert-default);
  &:hover {
    background: var(--asc-color-alert-default);
  }
`;
export const DefaultCancelButton = styled(Button)`
  margin-right: 10px;
  background-color: var(--asc-color-background-default);
  border: 1px solid var(--asc-color-base-shade4);
  color: var(--asc-color-base-default);
  &:hover {
    color: var(--asc-color-base-default);
  }
`;
