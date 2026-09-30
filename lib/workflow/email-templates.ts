interface EmailLayoutParams {
  heading: string
  body: string // pre-built inner HTML (paragraphs, lists, button)
}

const baseLayout = ({ heading, body }: EmailLayoutParams) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>BookWise</title>
</head>
<body style="margin:0; padding:0; background-color:#ffffff; font-family: Arial, Helvetica, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#ffffff; padding:32px 16px;">
    <tr>
      <td align="left">
        <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="background-color:#111827; border-radius:12px; padding:32px; max-width:480px; width:100%;">
          <tr>
            <td style="padding-bottom:16px; border-bottom:1px solid #2a2e3d;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size:20px;">📖</td>
                  <td style="padding-left:8px; font-size:18px; font-weight:bold; color:#ffffff;">BookWise</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding-top:24px;">
              <h1 style="margin:0 0 16px 0; font-size:20px; color:#ffffff; font-weight:bold;">${heading}</h1>
              ${body}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`

const greeting = (name: string) =>
  `<p style="margin:0 0 16px 0; color:#d1d5db; font-size:14px;">Hi ${name},</p>`

const paragraph = (text: string) =>
  `<p style="margin:0 0 16px 0; color:#9ca3af; font-size:14px; line-height:1.6;">${text}</p>`

const detailsList = (items: { label: string; value: string }[]) => `
  <ul style="margin:0 0 16px 0; padding:0 0 0 18px; color:#9ca3af; font-size:14px; line-height:1.8;">
    ${items
      .map(
        (i) =>
          `<li>${i.label}: <strong style="color:#e8c88e;">${i.value}</strong></li>`
      )
      .join('')}
  </ul>
`

const button = (label: string, href: string) => `
  <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 8px 0 24px 0;">
    <tr>
      <td style="background-color:#e8c88e; border-radius:6px;">
        <a href="${href}" style="display:inline-block; padding:10px 20px; font-size:14px; font-weight:bold; color:#111827; text-decoration:none;">
          ${label}
        </a>
      </td>
    </tr>
  </table>
`

const signOff = (line1: string) =>
  `<p style="margin:24px 0 0 0; color:#9ca3af; font-size:14px;">${line1},<br/>The BookWise Team</p>`

// ---- exported templates ----

export const welcomeEmail = ({
  fullname,
  loginUrl,
}: {
  fullname: string
  loginUrl: string
}) =>
  baseLayout({
    heading: 'Welcome to BookWise, Your Reading Companion!',
    body:
      greeting(fullname) +
      paragraph(
        "Welcome to BookWise! We're excited to have you join our community of book enthusiasts. Explore a wide range of books, borrow with ease, and manage your reading journey seamlessly."
      ) +
      paragraph('Get started by logging in to your account:') +
      button('Login to BookWise', loginUrl) +
      signOff('Happy reading'),
  })

export const accountApprovedEmail = ({
  fullname,
  loginUrl,
}: {
  fullname: string
  loginUrl: string
}) =>
  baseLayout({
    heading: 'Your BookWise Account Has Been Approved!',
    body:
      greeting(fullname) +
      paragraph(
        'Congratulations! Your BookWise account has been approved. You can now browse our library, borrow books, and enjoy all the features of your new account.'
      ) +
      paragraph('Log in to get started:') +
      button('Log in to BookWise', loginUrl) +
      signOff('Welcome aboard'),
  })

export const bookBorrowedEmail = ({
  fullname,
  bookTitle,
  borrowDate,
  dueDate,
  borrowedBooksUrl,
}: {
  fullname: string
  bookTitle: string
  borrowDate: string
  dueDate: string
  borrowedBooksUrl: string
}) =>
  baseLayout({
    heading: "You've Borrowed a Book!",
    body:
      greeting(fullname) +
      paragraph(
        `You've successfully borrowed <strong style="color:#ffffff;">${bookTitle}</strong>. Here are the details:`
      ) +
      detailsList([
        { label: 'Borrowed On', value: borrowDate },
        { label: 'Due Date', value: dueDate },
      ]) +
      paragraph("Enjoy your reading, and don't forget to return the book on time!") +
      button('View Borrowed Books', borrowedBooksUrl) +
      signOff('Happy reading'),
  })

export const bookDueReminderEmail = ({
  fullname,
  bookTitle,
  dueDate,
  renewUrl,
}: {
  fullname: string
  bookTitle: string
  dueDate: string
  renewUrl: string
}) =>
  baseLayout({
    heading: `Reminder: ${bookTitle} is Due Soon!`,
    body:
      greeting(fullname) +
      paragraph(
        `Just a reminder that <strong style="color:#ffffff;">${bookTitle}</strong> is due for return on <strong style="color:#e8c88e;">${dueDate}</strong>. Kindly return it on time to avoid late fees.`
      ) +
      paragraph("If you're still reading, you can renew the book in your account.") +
      button('Renew Book Now', renewUrl) +
      signOff('Keep reading'),
  })

export const bookReceiptEmail = ({
  fullname,
  bookTitle,
  borrowDate,
  dueDate,
  receiptUrl,
}: {
  fullname: string
  bookTitle: string
  borrowDate: string
  dueDate: string
  receiptUrl: string
}) =>
  baseLayout({
    heading: `Your Receipt for ${bookTitle} is Ready!`,
    body:
      greeting(fullname) +
      paragraph(
        `Your receipt for borrowing <strong style="color:#ffffff;">${bookTitle}</strong> has been generated. Here are the details:`
      ) +
      detailsList([
        { label: 'Borrowed On', value: borrowDate },
        { label: 'Due Date', value: dueDate },
      ]) +
      paragraph('You can download the receipt here:') +
      button('Download Receipt', receiptUrl) +
      signOff('Keep the pages turning'),
  })

export const bookReturnedEmail = ({
  fullname,
  bookTitle,
  browseUrl,
}: {
  fullname: string
  bookTitle: string
  browseUrl: string
}) =>
  baseLayout({
    heading: `Thank You for Returning ${bookTitle}!`,
    body:
      greeting(fullname) +
      paragraph(
        `We've successfully received your return of <strong style="color:#ffffff;">${bookTitle}</strong>. Thank you for returning it on time.`
      ) +
      paragraph('Looking for your next read? Browse our collection and borrow your next favorite book!') +
      button('Explore New Books', browseUrl) +
      signOff('Happy exploring'),
  })

export const inactivityReminderEmail = ({
  fullname,
  browseUrl,
}: {
  fullname: string
  browseUrl: string
}) =>
  baseLayout({
    heading: 'We Miss You at BookWise!',
    body:
      greeting(fullname) +
      paragraph(
        "It's been a while since we last saw you—over three days, to be exact! New books are waiting for you, and your next great read might just be a click away."
      ) +
      paragraph('Come back and explore now:') +
      button('Explore Books on BookWise', browseUrl) +
      signOff('See you soon'),
  })

export const checkInReminderEmail = ({
  fullname,
  loginUrl,
}: {
  fullname: string
  loginUrl: string
}) =>
  baseLayout({
    heading: "Don't Forget to Check In at BookWise",
    body:
      greeting(fullname) +
      paragraph(
        "We noticed you haven't checked in recently. Stay active and keep track of your borrowed books, due dates, and new arrivals."
      ) +
      paragraph('Log in now to stay on top of your reading:') +
      button('Log in to BookWise', loginUrl) +
      signOff('Keep the pages turning'),
  })

export const milestoneEmail = ({
  fullname,
  discoverUrl,
}: {
  fullname: string
  discoverUrl: string
}) =>
  baseLayout({
    heading: 'Congratulations on Reaching a New Milestone!',
    body:
      greeting(fullname) +
      paragraph(
        "Great news! You've reached a new milestone in your reading journey with BookWise. 🎉 Whether it's finishing a challenging book, staying consistent with your reading goals, or exploring new genres, your dedication inspires us."
      ) +
      paragraph('Keep the momentum going—there are more exciting books and features waiting for you!') +
      paragraph('Log in now to discover your next adventure:') +
      button('Discover New Reads', discoverUrl) +
      signOff('Keep the pages turning'),
  })