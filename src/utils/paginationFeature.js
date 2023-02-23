

module.exports = async function({page,limit},Model,res)
{
const where={}
 page = parseInt(page) || 1;
const pageSize = parseInt(limit) || 6;
const skip = (page - 1) * pageSize;
const total = await Model.countDocuments(where);
const pages = Math.ceil(total / pageSize);
if (page > pages) {
    return res.status(404).json({
        success: true,
        message: "No page found",
    });
}
result = await Model.find(where).skip(skip).limit(pageSize).sort({is_pinned:-1,'createdAt':-1}).lean();
res.json({
    success: true,
    count: result.length,
    page,
    pages,
    data: result
});

}