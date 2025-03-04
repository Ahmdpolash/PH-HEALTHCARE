import prisma from "../../../shared/prisma";

const getAllAdminFromDb = async (params: any, options: any) => {
  const { searchTerm, ...filterData } = params;

  const arr = [];

  if (params.searchTerm) {
    arr.push({
      OR: ["name", "email"].map((item) => ({
        [item]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
    }
    

  

  const where = { AND: arr };
  const result = await prisma.admin.findMany({
    where: where,
  });
};
