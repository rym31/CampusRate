export const toJsonOptions = {
  virtuals: true,
  transform: (_doc: unknown, ret: Record<string, unknown>) => {
    delete ret._id;
    return ret;
  },
};
