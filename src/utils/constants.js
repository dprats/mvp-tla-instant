export const SMALL_TLA = `
---- MODULE LLM ----
EXTENDS Naturals

=============================`;

export const MEDIUM_TLA = `---- MODULE example ----
EXTENDS Naturals

VARIABLES x, y

Init == x = 0 /\ y = 0

Next == x' = x + 1 /\ y' = y + 1

Spec == Init /\ [][Next]_<<x, y>>

=============================`;

export const LAYERS_O1_TLA = `
------------------------------ MODULE layers01 ------------------------------

EXTENDS Integers, Sequences

(*--algorithm CoinTransfer

variables
    users = 2; \* Number of users in the system
    accounts = [i \in 1..users |-> 100]; \* Initial balances for all accounts
    userTransactions = [i \in 1..users |-> 0]; \* Number of transactions made by each user
    messageQueue = <<>>; \* Queue for messages sent to the COIN_TRANSFER_CONTRACT
    nextMessage = 1; \* Index for processing the next message in the queue
    initialTotalTokens = users * 100; \* Initial total amount of tokens in the system
    maxUserTransactions = 1; \* Maximum transactions per user. Once the maximum is hit, model terminates.

define
    \* Define the invariant that ensures no account has a negative balance
    NoNegativeBalances == 
        \A i \in 1..users: accounts[i] >= 0

    \* Define the invariant that ensures no user sends a negative amount of tokens
    NoNegativeTransfers ==
        \A msg \in messageQueue: msg.amount >= 0

    \* Define the invariant that ensures no user sends more tokens than their balance
    NoOverspending ==
        \A msg \in messageQueue: accounts[msg.from] >= msg.amount

    \* Define the invariant that ensures the total amount of tokens never changes
    ConstantTotalTokens ==
      (LET sumAccounts[n \in 1..users] == IF n = 1 THEN accounts[n] ELSE sumAccounts[n-1] + accounts[n]
             IN sumAccounts[users]) = initialTotalTokens
    
    \* If a user has been sent tokens, the recipient will eventually see them in their balance
    RecipientSeesTokens ==
        \A msg \in messageQueue:
            <> (accounts[msg.to] = msg.amount + accounts[msg.to])

    \* Conditions that must always hold
    TypeInvariant ==
        /\ NoNegativeBalances
        /\ NoNegativeTransfers
        /\ NoOverspending
        /\ ConstantTotalTokens
        /\ RecipientSeesTokens
    
end define;

\* PROCESS REPRESENTING COIN_TRANSFER_CONTRACT
process COIN_TRANSFER_CONTRACT = 0
variables
    msg; \* Temporary variable to hold the current message being processed
begin COIN_TRANSFER_CONTRACT:
    \* Continuous loop to process all messages (that ends when maxUserTransactions is reached for all users)
    while nextMessage <= Len(messageQueue) /\ \E i \in 1..users: userTransactions[i] < maxUserTransactions do
         msg := messageQueue[nextMessage]; \* Retrieve the next message
         \* Check if the sender has enough balance and process the transfer (note: this looks like it should cause an exploit since it has no locks)
         if accounts[msg.from] >= msg.amount then
            SubtractTokensFromSender:
                accounts[msg.from] := accounts[msg.from] - msg.amount;
            AddToTokensRecipient:
                accounts[msg.to] := accounts[msg.to] + msg.amount;
         end if;
         
         \* Move to the next message  
         MoveToNextMessage:
            nextMessage := nextMessage + 1;       
    end while;
end process;

\* PROCESS REPRESENTING USERS
process User \in 1..users
variables
    target, amount; \* Temporary variables to hold target account and transfer amount
begin User:
    \* Continuous loop to simulate user actions (that ends when maxUserTransactions is reached)
    while userTransactions[self] < maxUserTransactions do
        target := (self % users) + 1; \* Select a target account different from the user's
        amount := 1; \* Set the transfer amount
        \* Append the message to the queue, triggering COIN_TRANSFER_CONTRACT
        messageQueue := Append(messageQueue, [from |-> self, to |-> target, amount |-> amount]);
        userTransactions[self] := userTransactions[self] + 1;
    end while;
end process;

end algorithm;*)
\* BEGIN TRANSLATION (chksum(pcal) = "97278d7e" /\ chksum(tla) = "38261ddf")
\* Label COIN_TRANSFER_CONTRACT of process COIN_TRANSFER_CONTRACT at line 55 col 5 changed to COIN_TRANSFER_CONTRACT_
\* Label User of process User at line 77 col 5 changed to User_
CONSTANT defaultInitValue
VARIABLES users, accounts, userTransactions, messageQueue, nextMessage, 
          initialTotalTokens, maxUserTransactions, pc

(* define statement *)
NoNegativeBalances ==
    \A i \in 1..users: accounts[i] >= 0


NoNegativeTransfers ==
    \A msg \in messageQueue: msg.amount >= 0


NoOverspending ==
    \A msg \in messageQueue: accounts[msg.from] >= msg.amount


ConstantTotalTokens ==
  (LET sumAccounts[n \in 1..users] == IF n = 1 THEN accounts[n] ELSE sumAccounts[n-1] + accounts[n]
         IN sumAccounts[users]) = initialTotalTokens


RecipientSeesTokens ==
    \A msg \in messageQueue:
        <> (accounts[msg.to] = msg.amount + accounts[msg.to])


TypeInvariant ==
    /\ NoNegativeBalances
    /\ NoNegativeTransfers
    /\ NoOverspending
    /\ ConstantTotalTokens
    /\ RecipientSeesTokens

VARIABLES msg, target, amount

vars == << users, accounts, userTransactions, messageQueue, nextMessage, 
           initialTotalTokens, maxUserTransactions, pc, msg, target, amount
        >>

ProcSet == {0} \cup (1..users)

Init == (* Global variables *)
        /\ users = 2
        /\ accounts = [i \in 1..users |-> 100]
        /\ userTransactions = [i \in 1..users |-> 0]
        /\ messageQueue = <<>>
        /\ nextMessage = 1
        /\ initialTotalTokens = users * 100
        /\ maxUserTransactions = 1
        (* Process COIN_TRANSFER_CONTRACT *)
        /\ msg = defaultInitValue
        (* Process User *)
        /\ target = [self \in 1..users |-> defaultInitValue]
        /\ amount = [self \in 1..users |-> defaultInitValue]
        /\ pc = [self \in ProcSet |-> CASE self = 0 -> "COIN_TRANSFER_CONTRACT_"
                                        [] self \in 1..users -> "User_"]

COIN_TRANSFER_CONTRACT_ == /\ pc[0] = "COIN_TRANSFER_CONTRACT_"
                           /\ IF nextMessage <= Len(messageQueue) /\ \E i \in 1..users: userTransactions[i] < maxUserTransactions
                                 THEN /\ msg' = messageQueue[nextMessage]
                                      /\ IF accounts[msg'.from] >= msg'.amount
                                            THEN /\ pc' = [pc EXCEPT ![0] = "SubtractTokensFromSender"]
                                            ELSE /\ pc' = [pc EXCEPT ![0] = "MoveToNextMessage"]
                                 ELSE /\ pc' = [pc EXCEPT ![0] = "Done"]
                                      /\ msg' = msg
                           /\ UNCHANGED << users, accounts, userTransactions, 
                                           messageQueue, nextMessage, 
                                           initialTotalTokens, 
                                           maxUserTransactions, target, amount >>

MoveToNextMessage == /\ pc[0] = "MoveToNextMessage"
                     /\ nextMessage' = nextMessage + 1
                     /\ pc' = [pc EXCEPT ![0] = "COIN_TRANSFER_CONTRACT_"]
                     /\ UNCHANGED << users, accounts, userTransactions, 
                                     messageQueue, initialTotalTokens, 
                                     maxUserTransactions, msg, target, amount >>

SubtractTokensFromSender == /\ pc[0] = "SubtractTokensFromSender"
                            /\ accounts' = [accounts EXCEPT ![msg.from] = accounts[msg.from] - msg.amount]
                            /\ pc' = [pc EXCEPT ![0] = "AddToTokensRecipient"]
                            /\ UNCHANGED << users, userTransactions, 
                                            messageQueue, nextMessage, 
                                            initialTotalTokens, 
                                            maxUserTransactions, msg, target, 
                                            amount >>

AddToTokensRecipient == /\ pc[0] = "AddToTokensRecipient"
                        /\ accounts' = [accounts EXCEPT ![msg.to] = accounts[msg.to] + msg.amount]
                        /\ pc' = [pc EXCEPT ![0] = "MoveToNextMessage"]
                        /\ UNCHANGED << users, userTransactions, messageQueue, 
                                        nextMessage, initialTotalTokens, 
                                        maxUserTransactions, msg, target, 
                                        amount >>

COIN_TRANSFER_CONTRACT == COIN_TRANSFER_CONTRACT_ \/ MoveToNextMessage
                             \/ SubtractTokensFromSender
                             \/ AddToTokensRecipient

User_(self) == /\ pc[self] = "User_"
               /\ IF userTransactions[self] < maxUserTransactions
                     THEN /\ target' = [target EXCEPT ![self] = (self % users) + 1]
                          /\ amount' = [amount EXCEPT ![self] = 1]
                          /\ messageQueue' = Append(messageQueue, [from |-> self, to |-> target'[self], amount |-> amount'[self]])
                          /\ userTransactions' = [userTransactions EXCEPT ![self] = userTransactions[self] + 1]
                          /\ pc' = [pc EXCEPT ![self] = "User_"]
                     ELSE /\ pc' = [pc EXCEPT ![self] = "Done"]
                          /\ UNCHANGED << userTransactions, messageQueue, 
                                          target, amount >>
               /\ UNCHANGED << users, accounts, nextMessage, 
                               initialTotalTokens, maxUserTransactions, msg >>

User(self) == User_(self)

(* Allow infinite stuttering to prevent deadlock on termination. *)
Terminating == /\ \A self \in ProcSet: pc[self] = "Done"
               /\ UNCHANGED vars

Next == COIN_TRANSFER_CONTRACT
           \/ (\E self \in 1..users: User(self))
           \/ Terminating

Spec == Init /\ [][Next]_vars

Termination == <>(\A self \in ProcSet: pc[self] = "Done")

\* END TRANSLATION 

\* END TRANSLATION 
=============================================================================

`;


export const DEFAULT_HIGH_LEVEL_INTENT = `

<!-- Start describing your system in markdown here -->
# Design Intent

## 1. High level Intent
<!-- Example: I have a multi-threaded operating system. I want to make sure the processes do not cause a deadlock or race condition. -->

## 2. Main Agents/Processes
<!-- Example: I three threads. -->

## 3. How the Agents/Processes behave and interact with each other?

## 4. What should never happen (Safety Properties)
<!-- Example: there should never be a deadlock -->

## 5. What should Always Eventually Happen (Liveness Properties)

## 6. Simplifying assumptions

## 7. Sanity Checks

`;

export const DEFAULT_SEQUENCE_DIAGRAM = `
sequenceDiagram
    par L1_contract to L2_contract
        L1_contract->>L2_contract: Here are some transactions!
    and L1_contract to Oracle
        L1_contract->>Oracle: Here are some transactions!
    end
    L2_contract-->>L1_contract: More transactions!
    Oracle-->>L1_contract: More transactions!
`;

export const DEFAULT_SEQUENCE_DIAGRAM2 = `
sequenceDiagram
    participant USER
    participant L2
    participant RELAY
    participant L1
    USER->>L1: lock up funds
    RELAY->>L1: Observe lockup
    USER->>L2: Submit Transfers
    USER->>L2: Submit Transfers
    USER->>L2: Submit Transfers
    USER-->>L2: Observe new balance
    RELAY->>L2: Mirror funds from L1 State
    RELAY->>L2: observe withdrawals
    RELAY->>L1: submit rollup
    USER-->>L1: Observe unlocked funds
`;

export const DINING_PHILOSOPHERS_SPEC = `
------------------------- MODULE DiningPhilosophers -------------------------
EXTENDS Naturals, Sequences, TLC

CONSTANT N \* Number of philosophers and forks

VARIABLES philosophers, forks

vars == << philosophers, forks >>

\* Type invariant to ensure that the states of philosophers and forks are as expected.
TypeInvariant ==
    /\ philosophers \in [1..N -> {"thinking", "hungry", "eating"}]
    /\ forks \in [1..N -> {"free", "taken"}]

\* Initial state: All philosophers are thinking, and all forks are free.
Init == 
    /\ philosophers = [i \in 1..N |-> "thinking"]
    /\ forks = [i \in 1..N |-> "free"]

\* Function to get the left philosopher/fork number.
Left(i) == IF i = 1 THEN N ELSE i-1
\* Function to get the right philosopher/fork number.
Right(i) == IF i = N THEN 1 ELSE i+1

\* A philosopher tries to eat: they must be hungry and both left and right forks should be free.
TryEat(i) == 
    /\ philosophers[i] = "hungry"
    /\ forks[Left(i)] = "free"
    /\ forks[Right(i)] = "free"
    /\ philosophers' = [philosophers EXCEPT ![i] = "eating"]
    /\ forks' = [forks EXCEPT ![Left(i)] = "taken", ![Right(i)] = "taken"]

\* A philosopher stops eating: they release both forks.
StopEat(i) == 
    /\ philosophers[i] = "eating"
    /\ philosophers' = [philosophers EXCEPT ![i] = "thinking"]
    /\ forks' = [forks EXCEPT ![Left(i)] = "free", ![Right(i)] = "free"]

\* A philosopher becomes hungry from a thinking state.
BecomeHungry(i) == 
    /\ philosophers[i] = "thinking"
    /\ philosophers' = [philosophers EXCEPT ![i] = "hungry"]

\* The next possible actions in the system are either a philosopher trying to eat, stopping eating, or becoming hungry.
Next == 
    \/ \E i \in 1..N : TryEat(i)
    \/ \E i \in 1..N : StopEat(i)
    \/ \E i \in 1..N : BecomeHungry(i)

\* The specification says we start in the initial state, and then repeatedly apply the Next actions.
Spec == Init /\ [][Next]_vars

\* (Optional) Termination condition to check a state where all philosophers are eating. 
\* Useful to check if such a state can be reached.
Termination == <>(\A i \in 1..N : philosophers[i] = "eating")

=============================================================================
`

export const DATABASE_TRANSACTION_SPEC = `
------------------------- MODULE DatabaseTransactions -------------------------
EXTENDS Naturals, Sequences, TLC

CONSTANT T \* Number of transactions
CONSTANT D \* Number of data items

VARIABLES transactions, dataLocks

vars == << transactions, dataLocks >>

\* Type invariant to ensure the states of transactions and dataLocks are as expected.
TypeInvariant ==
    /\ transactions \in [1..T -> {"idle", "waiting", "active"}]
    /\ dataLocks \in [1..D -> {"free", UNION {1..T}}]

\* Initial state: All transactions are idle, and all data items are free.
Init == 
    /\ transactions = [t \in 1..T |-> "idle"]
    /\ dataLocks = [d \in 1..D |-> "free"]

\* Function to get a random data item a transaction may be interested in. (A simplistic assumption for this model.)
DataItem(t) == t % D + 1

\* A transaction tries to get a lock on a data item for read/write operations.
TryLock(t) == 
    /\ transactions[t] = "waiting"
    /\ dataLocks[DataItem(t)] = "free"
    /\ transactions' = [transactions EXCEPT ![t] = "active"]
    /\ dataLocks' = [dataLocks EXCEPT ![DataItem(t)] = t]

\* A transaction releases the lock on a data item after completing its operations.
ReleaseLock(t) == 
    /\ transactions[t] = "active"
    /\ dataLocks[DataItem(t)] = t
    /\ transactions' = [transactions EXCEPT ![t] = "idle"]
    /\ dataLocks' = [dataLocks EXCEPT ![DataItem(t)] = "free"]

\* A transaction expresses the desire to perform operations on a data item and hence waits for a lock.
WaitForLock(t) == 
    /\ transactions[t] = "idle"
    /\ transactions' = [transactions EXCEPT ![t] = "waiting"]

\* The next possible actions in the system are either a transaction trying to get a lock, 
\* releasing a lock, or waiting for a lock.
Next == 
    \/ \E t \in 1..T : TryLock(t)
    \/ \E t \in 1..T : ReleaseLock(t)
    \/ \E t \in 1..T : WaitForLock(t)

\* The specification says we start in the initial state and then repeatedly apply the Next actions.
Spec == Init /\ [][Next]_vars

=============================================================================
`;

export const JOHN_SPEC_FROM_SEQUENCE_DIAGRAM = `
------------------------- MODULE Wrapped_Token -------------------------

(* Define the participants *)
CONSTANTS USER, L1, RELAY, L2

VARIABLES
    step,      (* A counter to track the current step in the sequence *)
    transfers  (* A counter to track the number of 'Submit Transfers' steps *)

Init ==
    step = "Init"
    /\ transfers = 0

(* Transitions based on the sequence diagram *)

LockUpFunds ==
    step = "Init"
    /\ step' = "FundsLockedUp"
    /\ transfers' = transfers

ObserveLockup ==
    step = "FundsLockedUp"
    /\ step' = "LockupObserved"
    /\ transfers' = transfers

SubmitTransfers ==
    step = "LockupObserved" \/ step = "Transferred"
    /\ transfers < 3
    /\ step' = "Transferred"
    /\ transfers' = transfers + 1

ObserveNewBalance ==
    step = "Transferred"
    /\ transfers = 3
    /\ step' = "BalanceObserved"
    /\ transfers' = transfers

MirrorFunds ==
    step = "BalanceObserved"
    /\ step' = "FundsMirrored"
    /\ transfers' = transfers

ObserveWithdrawals ==
    step = "FundsMirrored"
    /\ step' = "WithdrawalsObserved"
    /\ transfers' = transfers

SubmitRollup ==
    step = "WithdrawalsObserved"
    /\ step' = "RollupSubmitted"
    /\ transfers' = transfers

ObserveUnlockedFunds ==
    step = "RollupSubmitted"
    /\ step' = "UnlockedFundsObserved"
    /\ transfers' = transfers

(* Combine all the transitions *)
Next ==
    \/ LockUpFunds
    \/ ObserveLockup
    \/ SubmitTransfers
    \/ ObserveNewBalance
    \/ MirrorFunds
    \/ ObserveWithdrawals
    \/ SubmitRollup
    \/ ObserveUnlockedFunds

(* Complete system specification *)
Spec ==
    Init /\ [][Next]_<< step, transfers >>

=============================================================================
`;
