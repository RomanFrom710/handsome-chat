'use strict';

// This method is needed because somewhy mongoose prefers to return _id
// instead of id to the client. But _id appearing (which is a sort of db
// implementation detail) in browser is not a good idea. DAL is the only place
// where _id reference is appropriate. So this transform will allow us to
// remove some redundant mappings from repo code.
exports.renameIdField = function (schema) {
    schema.options.toJSON = schema.options.toJSON || {};

    schema.options.toJSON.transform = function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
    };
};
