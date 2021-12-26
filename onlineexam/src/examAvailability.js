const examAvailability = (assign, last) => {

    if(assign[1]?.length === 1)
        assign[1] = '0' + assign[1];

    if(assign[0]?.length === 1)
        assign[0] = '0' + assign[0];

    if(last[1]?.length === 1)
        last[1] = '0' + last[1];

    if(last[0]?.length === 1)
        last[0] = '0' + last[0];

    if(assign[2] === last[2]){                           // Year matching
        if(assign[0] === last[0])                        // Month matching
            return (assign[1] <= last[1]);               // Day matching
        else   
            return (assign[0] < last[0]);                // Month matching
    } else 
        return (assign[2] < last[2]);                    // Year matching
};

export default examAvailability;