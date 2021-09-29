import { darken, lighten } from 'polished';
import styled from 'styled-components';

export const ProductTable = styled.table`
  width: 100%;

  thead th {
    color: #999;
    text-align: left;
    padding: 12px;
  }

  tbody td {
    padding: 12px;
    border-bottom: 1px solid #eee;
  }

  > div {
    display: flex;
    align-items: center;
  }

  img {
    height: 100px;
    width: 180px;
  }

  strong {
    color: #333;
    display: block;
  }

  span {
    display: block;
    margin-top: 5px;
    font-size: 1rem;
    font-weight: 500;
    & + span {
      margin-left: 0.5rem;
    }
  }

  div {
    display: flex;
    align-items: center;

    input {
      border: 1px solid #ddd;
      border-radius: 4px;
      color: #666;
      padding: 6px;
      width: 50px;
    }
  }

  select {
    border: 1px solid #ddd;
    border-radius: 4px;
    color: #666;
    padding: 6px;
    width: 100px;
    cursor: pointer;

    option {
      color: var(--text-title);
    }
  }

  .btn-modal {
    color: var(--body);
    font-size: 1rem;
    border: 0;
    padding: 0;

    & + button {
      margin-left: 1rem;
    }

    &:hover {
      color: ${darken(0.06, '#5519cc')};
    }
  }

  button {
    background: none;
    border: 0;

    padding: 6px;

    svg {
      color: #5519cc;
      transition: color 0.2s;
    }

    &:hover {
      svg {
        color: ${darken(0.06, '#5519cc')};
      }
    }

    &:disabled {
      svg {
        color: ${lighten(0.25, '#5519cc')};
        cursor: not-allowed;
      }
    }
  }
`;
