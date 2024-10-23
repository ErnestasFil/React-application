export default class FilterData {
    filter(data, filters) {
        return data.filter(item => {
            let isValid = true;

            isValid = isValid && filters.gender.includes(item.gender.toLowerCase());

            const birthDate = new Date(item.birthDate);
            const fromDate = new Date(filters.birthDate.from);
            const untilDate = new Date(filters.birthDate.until);

            const isWithinRange =
                (!filters.birthDate.from || birthDate >= fromDate) &&
                (!filters.birthDate.until || birthDate <= untilDate);

            isValid = isValid && isWithinRange;

            return isValid;
        });
    }
}
