def calculate_monthly_payment(loan_amount, annual_interest_rate, loan_term_years):
    # Convert annual interest rate to monthly and calculate the number of total payments
    monthly_interest_rate = annual_interest_rate / 100 / 12
    total_payments = loan_term_years * 12

    # Calculate the monthly mortgage payment using the formula
    monthly_payment = (
        loan_amount
        * monthly_interest_rate
        / (1 - (1 + monthly_interest_rate) ** -total_payments)
    )

    return monthly_payment

# Input values
loan_amount = 210000  # Euro
annual_interest_rate = 4.5  # Annual interest rate in percentage
loan_term_years = 20  # Loan term in years

# Calculate and print the monthly mortgage payment
monthly_payment = calculate_monthly_payment(loan_amount, annual_interest_rate, loan_term_years)
print(f"Your monthly mortgage payment is approximately: {monthly_payment:.2f} Euro")