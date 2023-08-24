export const sequenceDiagramData = `
sequenceDiagram
    par L1_contract to L2_contract
        L1_contract->>L2_contract: Here are some transactions!
    and L1_contract to Oracle
        L1_contract->>Oracle: Here are some transactions!
    end
    L2_contract-->>L1_contract: More transactions!
    Oracle-->>L1_contract: More transactions!
`;
