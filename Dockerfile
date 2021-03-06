FROM golang:alpine

LABEL maintainer="Maurits van Altvorst <mvanaltvorst@icloud.com>"
ENV GO111MODULE=on

WORKDIR /go/src/github.com/mvanaltvorst/bedlightserver

RUN apk add --no-cache git tzdata
RUN ln -sf /usr/share/zoneinfo/Europe/Amsterdam /etc/localtime

EXPOSE 8080

COPY ./src ./
# COPY . /go/src/github.com/mvanaltvorst/bedlightserver/

RUN go get -d -v ./...
RUN go install -v ./...

CMD ["/go/bin/app"]
