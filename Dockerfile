FROM alpine:3.12.0 as maven_builder
RUN apk add --no-cache --update-cache maven openjdk11 npm git bash
WORKDIR /app
ADD pom.xml /app/pom.xml
RUN git config --global url."https://".insteadOf git://
# Usando repositórios externo - JAR e NPM
RUN mvn dependency:go-offline -B
ADD . /app
# Consulte https://docs.cronapp.io e busque por Novos parâmetros para gerar .war para mais informações sobre o TIER e CONTEXT_USE
ARG TIER
ARG CONTEXT_USE
RUN cd /app && mvn package -X -Dcronapp.profile=${TIER} -Dcronapp.useContext=${CONTEXT_USE}
# Usando repositórios JAR e NPM interno, comente as linhas equivalente acima, e logo após descomente do ADD até o último comando RUN
#ADD settings.xml  $HOME/.m2/settings.xml
#RUN npm config set registry https://my.registry.com/your-repository/name && mvn -s /app/settings.xml dependency:go-offline -B
#ADD . /app
#ARG TIER
#ARG CONTEXT_USE
#RUN cd /app && mvn -s /app/settings.xml package -X -Dcronapp.profile=${TIER} -Dcronapp.useContext=${CONTEXT_USE}

FROM tomcat:9.0.17-jre11
RUN rm -rf /usr/local/tomcat/webapps/* && groupadd tomcat && useradd -s /bin/false -M -d /usr/local/tomcat -g tomcat tomcat
COPY --from=maven_builder /app/target/*.war /usr/local/tomcat/webapps/ROOT.war
RUN chown tomcat:tomcat -R /usr/local/tomcat
USER tomcat