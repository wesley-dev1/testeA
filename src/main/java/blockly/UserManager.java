package blockly;

import cronapi.*;
import cronapi.rest.security.CronappSecurity;
import java.util.concurrent.Callable;



@CronapiMetaData(type = "blockly")
@CronappSecurity
public class UserManager {

public static final int TIMEOUT = 300;

/**
 *
 * @param param_Entidade
 * @return Var
 */
public static Var BeforeDelete(Var param_Entidade) throws Exception {
    return new Callable<Var>() {

        private Var authorizations = Var.VAR_NULL;
        private Var administrators = Var.VAR_NULL;

        public Var call() throws Exception {

            authorizations =
                    cronapi.database.Operations.query(Var.valueOf("app.entity.UserRole"),Var.valueOf("select u from UserRole u where u.user = :user AND u.role.normalizedName = :roleNormalizedName"),Var.valueOf("user",param_Entidade),Var.valueOf("roleNormalizedName",
                            Var.valueOf("administrators")));

            if (
                    Var.valueOf(
                            cronapi.list.Operations.size(authorizations).compareTo(
                                    Var.valueOf(0)) > 0).getObjectAsBoolean()) {

                administrators =
                        cronapi.database.Operations.query(Var.valueOf("app.entity.UserRole"),Var.valueOf("select u.user from UserRole u where u.role.normalizedName = :roleNormalizedName"),Var.valueOf("roleNormalizedName",
                                Var.valueOf("administrators")));

                if (
                        (
                                Var.valueOf(
                                        cronapi.list.Operations.size(administrators).compareTo(
                                                Var.valueOf(1)) > 0)).negate().getObjectAsBoolean()) {

                    cronapi.util.Operations.throwException(
                            cronapi.util.Operations.createException(
                                    cronapi.i18n.Operations.translate(Var.valueOf("OnlyOneAdministrator"))));
                }
            }
            return param_Entidade;
        }
    }.call();
}

/**
 *
 * @param param_Entidade
 * @return Var
 */
// UserManager
public static Var BeforeInsert(Var param_Entidade) throws Exception {
 return new Callable<Var>() {

   // param
   private Var Entidade = param_Entidade;
   // end

   public Var call() throws Exception {

    Entidade =
    Var.valueOf(Normalize(Entidade));
    return Entidade;
   }
 }.call();
}

/**
 *
 * @param param_Entidade
 * @return Var
 */
// UserManager
public static Var BeforeUpdate(Var param_Entidade) throws Exception {
 return new Callable<Var>() {

   // param
   private Var Entidade = param_Entidade;
   // end

   public Var call() throws Exception {

    Entidade =
    Var.valueOf(Normalize(Entidade));
    return Entidade;
   }
 }.call();
}

/**
 *
 * @param Entidade
 * @return Var
 */
// Descreva esta função...
public static Var Normalize(Var Entidade) throws Exception {
 return new Callable<Var>() {

   private Var userName = Var.VAR_NULL;
   private Var email = Var.VAR_NULL;

   public Var call() throws Exception {

    userName =
    cronapi.text.Operations.normalize(
    cronapi.object.Operations.getObjectField(Entidade, Var.valueOf("userName")));

    email =
    cronapi.text.Operations.normalize(
    cronapi.object.Operations.getObjectField(Entidade, Var.valueOf("email")));

    cronapi.object.Operations.setObjectField(Entidade, Var.valueOf("normalizedUserName"), userName);

    cronapi.object.Operations.setObjectField(Entidade, Var.valueOf("normalizedEmail"), email);
    return Entidade;
   }
 }.call();
}

}

