import { render, fireEvent, screen } from '@testing-library/react';
import Modal from './Modal';

const show = true;
const title = 'title';
const description = 'description';
const cancelLabel = 'cancelLabel';
const successLabel = 'successLabel';
const onHide = jest.fn();
const onSuccess = jest.fn();

let component;
const defaultProps = {
  show: show,
  title: title,
  description: description,
  cancelLabel: cancelLabel,
  successLabel: successLabel,
  onHide: onHide,
  onSuccess: onSuccess,
}

beforeEach(() => component = render(<Modal {...defaultProps} />));
afterEach(() => component = null);

test('renders modal', () => {
  expect(component).not.toBeUndefined();
});

test('renders title', () => {
  const linkElement = screen.getByText(title);
  expect(linkElement).toBeInTheDocument();
});

test('renders description', () => {
  const linkElement = screen.getByText(description);
  expect(linkElement).toBeInTheDocument();
});

test('renders cancel button', () => {
  const linkElement = screen.getByText(cancelLabel);
  expect(linkElement).toBeInTheDocument();
});

test('renders success button', () => {
  const linkElement = screen.getByText(successLabel);
  expect(linkElement).toBeInTheDocument();
});

test('cancel button should call onHide', () => {
  fireEvent.click(screen.getByText(cancelLabel))

  expect(onHide).toHaveBeenCalled();
});

test('success button should call onSuccess', () => {
  fireEvent.click(screen.getByText(successLabel))

  expect(onSuccess).toHaveBeenCalled();
});
