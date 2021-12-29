const dateFormatter = date => {
    if(date === undefined) 
        return date;
        
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const splitted = date.split('/');

    const formattedDate = `${splitted[1]} ${months[parseInt(splitted[0]) - 1]}, ${splitted[2]}`;
    
    return formattedDate;
}

export default dateFormatter;