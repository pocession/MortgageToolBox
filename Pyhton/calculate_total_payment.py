def calculate_total_payment(loan_amount, annual_interest_rate, loan_term_years):
    # Convert annual interest rate to monthly and calculate the number of total payments
    monthly_interest_rate = annual_interest_rate / 100 / 12
    total_payments = loan_term_years * 12

    # Calculate the total payment using the formula
    total_payment = (
        loan_amount
        * monthly_interest_rate
        / (1 - (1 + monthly_interest_rate) ** -total_payments)
        * total_payments
    )

    return total_payment

# Input values
loan_amount = 210000 # Euro
loan_term_years = 20
original_interest_rate = 4.5  # Original annual interest rate in percentage

# Calculate total payments with the original interest rate
total_payment_original = calculate_total_payment(loan_amount, original_interest_rate, loan_term_years)

# Update interest rate to 2.5%
new_interest_rate = 2.5  # New annual interest rate in percentage

# Calculate total payments with the new interest rate
total_payment_new = calculate_total_payment(loan_amount, new_interest_rate, loan_term_years)

# Calculate and print the total savings
savings_total = total_payment_original - total_payment_new
savings_per_month = savings_total / (loan_term_years * 12)
print(f"You can save approximately: {savings_total:.2f} Euro over the 20-year period.")
print(f"You can save approximately: {savings_per_month:.2f} Euro per month.")
