import { render, screen, fireEvent } from '@testing-library/react'
import InterestForm from '../InterestForm'
import { push } from 'firebase/database'

// mock react router navigation
const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate
}))

// mock firebase database
jest.mock('firebase/database', () => ({
  push: jest.fn(() => Promise.resolve()),
  ref: jest.fn()
}))

// mock survey-react-ui
jest.mock('survey-react-ui', () => ({
  Survey: ({ model }) => (
    <button
      data-testid="complete-survey"
      onClick={() => model.onComplete.fire(model, { data: { question1: ['Strong mission'], question2: ['High school'] } })}
    >
      Complete Survey
    </button>
  )
}))

describe('InterestForm', () => {

  beforeEach(() => {
    jest.clearAllMocks()
    localStorage.clear()
  })

  it('renders survey component', () => {
    render(<InterestForm />)

    expect(screen.getByTestId('complete-survey')).toBeInTheDocument()
  })

  it('saves survey results to Firebase when survey completes', async () => {
    render(<InterestForm />)

    fireEvent.click(screen.getByTestId('complete-survey'))

    expect(push).toHaveBeenCalled()
  })

  it('stores survey results in localStorage', async () => {
    render(<InterestForm />)

    fireEvent.click(screen.getByTestId('complete-survey'))

    const storedData = JSON.parse(localStorage.getItem('userSurveyData'))

    expect(storedData).toEqual({
      question1: ['Strong mission'],
      question2: ['High school']
    })
  })

  it('shows completion message after survey submission', async () => {
    render(<InterestForm />)

    fireEvent.click(screen.getByTestId('complete-survey'))

    expect(await screen.findByText('Thank you for completing the survey!')).toBeInTheDocument()
  })

  it('renders "See Results" button after completion', async () => {
    render(<InterestForm />)

    fireEvent.click(screen.getByTestId('complete-survey'))

    expect(await screen.findByText('See Results')).toBeInTheDocument()
  })

  it('navigates to match page when clicking "See Results"', async () => {
    render(<InterestForm />)

    fireEvent.click(screen.getByTestId('complete-survey'))

    const button = await screen.findByText('See Results')
    fireEvent.click(button)

    expect(mockNavigate).toHaveBeenCalledWith('/match')
  })

})
