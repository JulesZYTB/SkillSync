import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

class AuthRepository {
  async findByEmail(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from users where email = ?",
      [email]
    );

    return rows[0];
  }
}

export default new AuthRepository();
