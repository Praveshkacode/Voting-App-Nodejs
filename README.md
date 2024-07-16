voting application

what ??
A functionality where user can give vote to the given set of candidates

Models ?
Routes ?

voting app functionality ?

1. user signin/signup 
2. see the list of candidate
3. vote oen of the candidate, afetr voting, user can,t vote again
4. there is a route which show list of candidates and their live vote counts sorted by their vote count
5. user data must contain their one unique government id proof named : adhar card number
6. there should be one candidate who can only maintain the table of candidate and he can't able to vote at all 
7. user can change their password
8. user can login with adhar card and password
9. admin can't vote at all


---------------------------------------------------------------------------------

Routes

User Authentication :
    /signup: POST - Create  a new user account
    /login: POST - Log in to an existing account

Voting:
    /candidates: GET - Get the list of candidates
    /vote/:candidateId : POST - Vote for a specific candidate

Vote Count :
    /vote/counts : GET - get the list of candidates sorted by their vote counts

User Profile:
    /profile: GET - Get the user's profile information
    /profile/password: PUT - change the user's password

Admin Candidate Management:
    /candidates: POST - cerate a new candidate
    /candidates/:candidateId: PUT - Update an existing candidate
    /candidates/:candidateId: DELETE - Delete a candidate from the list.
