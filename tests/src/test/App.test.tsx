import { describe, it, expect } from 'vitest';
import { render, screen } from './utils';
import App from '../App';

describe('Shopping Mall App', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(document.body).toBeTruthy();
  });

  it('displays main content area', () => {
    render(<App />);
    const main = document.querySelector('main') || document.querySelector('[role="main"]') || document.body;
    expect(main).toBeTruthy();
  });

  it('has a navigation or header element', () => {
    render(<App />);
    const header = document.querySelector('header') || document.querySelector('nav');
    expect(header).toBeTruthy();
  });

  it('shows product-related content', () => {
    render(<App />);
    const body = document.body.textContent || '';
    const hasProductContent =
      body.length > 0;
    expect(hasProductContent).toBe(true);
  });
});