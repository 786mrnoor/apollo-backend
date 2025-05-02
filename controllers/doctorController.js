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

function buildFilter(filterObject) {
    let filter = {
        $and: []
    };
    if (!filterObject) return filter;
    filterObject = JSON.parse(filterObject);
    const { consultMode, experience, fees, language, facilityType } = filterObject;

    if (consultMode?.length > 0) {
        // if there is both mode checked
        if (!(consultMode.includes('PHYSICAL') && consultMode.includes('ONLINE'))) {
            filter.$and.push({ consultMode: { $in: consultMode } });
        }
    }

    if (experience?.length > 0) {
        const expFilters = experience.map((range) => {
            const { min, max } = range;
            return { experience: { $gte: min, $lte: max } };
        });
        filter.$and.push({ $or: expFilters });
    }
    if (fees?.length > 0) {
        const feesFilters = fees.map((range) => {
            const { min, max } = range;
            return { fees: { $gte: min, $lte: max } };
        });
        filter.$and.push({ $or: feesFilters });
    }

    if (language?.length > 0) filter.$and.push({ languages: { $in: language } })
    if (facilityType?.length > 0) filter.$and.push({ facilityType: { $in: facilityType } })


    return filter;

}
// GET /api/list-doctors
export const listDoctors = async (req, res) => {
    try {
        const { filterObject, sortby, page = 1, limit = 10 } = req.query;

        const sort = buildSortBy(sortby);

        const filter = buildFilter(filterObject)

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
