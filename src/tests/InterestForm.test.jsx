import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from "react-router-dom";
import '@testing-library/jest-dom/vitest'
import InterestForm from '../components/InterestForm'
import { push } from 'firebase/database'

// mock react router navigation
const mockNavigate = vi.fn()

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  MemoryRouter: ({ children }) => children,
}))

// mock auth context
vi.mock('../AuthContext.jsx', () => ({
  useAuth: () => ({
    user: { uid: 'test-user-123' },
    loading: false,
    loginWithGoogle: vi.fn(),
    logout: vi.fn(),
  })
}))

// mock firebase database
vi.mock('firebase/database', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    push: vi.fn(() => Promise.resolve()),
    ref: vi.fn(),
    update: vi.fn(() => Promise.resolve()),
  }
})

// mock survey-react-ui
vi.mock('survey-react-ui', () => ({
  Survey: ({ model }) => (
    <button
      data-testid="complete-survey"
      onClick={() => {
        model.data = {
          question1: ['Strong mission'],
          question2: ['High school']
        }
        model.onComplete.fire(model, { data: model.data })
      }}
    >
      Complete Survey
    </button>
  )
}))

describe('InterestForm', () => {

  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  it('renders survey component', () => {
    render(
      <MemoryRouter>
        <InterestForm />
      </MemoryRouter>
    )

    expect(screen.getByTestId('complete-survey')).toBeInTheDocument()
  })

  it('saves survey results to Firebase when survey completes', async () => {
    render(
      <MemoryRouter>
        <InterestForm />
      </MemoryRouter>
    )

    fireEvent.click(screen.getByTestId('complete-survey'))

    expect(push).toHaveBeenCalled()
  })

  it('stores survey results in localStorage', async () => {
    render(
      <MemoryRouter>
        <InterestForm />
      </MemoryRouter>
    )

    fireEvent.click(screen.getByTestId('complete-survey'))

    const storedData = JSON.parse(localStorage.getItem('userSurveyData'))

    expect(storedData).toEqual({
      question1: ['Strong mission'],
      question2: ['High school']
    })
  })

  it('shows completion message after survey submission', async () => {
    render(
      <MemoryRouter>
        <InterestForm />
      </MemoryRouter>
    )

    fireEvent.click(screen.getByTestId('complete-survey'))

    expect(await screen.findByText('Thank you!')).toBeInTheDocument()
  })

  it('renders "Go to Matches" button after completion', async () => {
    render(
      <MemoryRouter>
        <InterestForm />
      </MemoryRouter>
    )

    fireEvent.click(screen.getByTestId('complete-survey'))

    expect(await screen.findByText('Go to Matches')).toBeInTheDocument()
  })

  it('navigates to match page when clicking "Go to Matches"', async () => {
    render(
      <MemoryRouter>
        <InterestForm />
      </MemoryRouter>
    )

    fireEvent.click(screen.getByTestId('complete-survey'))

    const button = await screen.findByText('Go to Matches')
    fireEvent.click(button)

    expect(mockNavigate).toHaveBeenCalledWith('/match')
  })

})

