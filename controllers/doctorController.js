import Doctor from '../models/doctorModel.js';

// POST /api/add-doctor
export const addDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.create(req.body);
        res.status(201).json(doctor);
    } catch (error) {
        console.error(error);
        res.status(200).json({ error: true, message: error.message });
    }
};

function buildSortBy(sortBy) {
    let sort = {};
    switch (sortBy) {
        case 'price_ascending': {
            sort.physicalConsultationFees = 1;
            sort.onlineConsultationFees = 1;
            break;
        }
        case 'price_descending': {
            sort.physicalConsultationFees = -1;
            sort.onlineConsultationFees = -1;
            break;
        }
        case 'experience': {
            sort.experience = 1;
            break;
        }
        case 'rating': {
            sort.rating = 1;
            break;
        }
    }

    return sort;
}

function getRange(range) {
    if (range.endsWith('+')) {
        const min = parseInt(range.replace('+', ''));
        return { $gte: min }
    } else if (range.includes('-')) {
        let [min, max] = range.split('-').map(Number);
        return { $gte: min, $lte: max }
    }
}
function buildFilter(query) {
    let filter = {
        $and: []
    };
    const { consultMode, experience, fees, languages, facilityType } = query;

    // if there is only one mode checked
    if (consultMode && !Array.isArray(consultMode)) {
        filter.$and.push({ consultMode });
    }

    if (Array.isArray(experience)) {
        const expFilters = experience.map((value) => {
            const range = getRange(value);
            return { experience: range };
        });
        filter.$and.push({ $or: expFilters });
    }
    else if (experience) {
        const range = getRange(experience);
        if (range) {
            filter.$and.push({ experience: range });
        }
    }

    if (Array.isArray(fees)) {
        const feesFilters = fees.map((value) => {
            const range = getRange(value);
            return {
                $or: [
                    { onlineConsultationFees: range },
                    { physicalConsultationFees: range }
                ]
            }
        });
        filter.$and.push({ $or: feesFilters });
    }
    else if (fees) {
        const range = getRange(fees);
        if (range) {
            filter.$and.push({
                $or: [
                    { onlineConsultationFees: range },
                    { physicalConsultationFees: range }
                ]
            });
        }
    }

    if (Array.isArray(languages)) {
        filter.$and.push({ languages: { $in: languages } })
    }
    else if (languages) {
        filter.$and.push({ languages: languages })
    }

    if (Array.isArray(facilityType)) {
        filter.$and.push({ facilityType: { $in: facilityType } })
    } else if (facilityType) {
        filter.$and.push({ facilityType: facilityType })
    }
    return filter;

}
// GET /api/list-doctors
export const listDoctors = async (req, res) => {
    try {
        const { sortby, page = 1, limit = 3 } = req.query;

        const filter = buildFilter(req.query);

        const sort = buildSortBy(sortby);

        const doctors = await Doctor.find(filter)
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const total = await Doctor.countDocuments(filter);

        res.status(200).json({
            data: doctors,
            total,
            page: Number(page),
            pages: Math.ceil(total / limit)
        });
    } catch (error) {
        console.error(error);
        res.status(200).json({ error: true, message: error.message });
    }
};
