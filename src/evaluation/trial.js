class trial{
    startTime;
    endTime;
    errors;
    correct;
    percent;

    trial(name){
        this.name = name;
        this.startTime = 0;
        this.endTime = 0;
        this.errors = 0;
        this.correct = 0;
        this.percent = 0;
    }

    setStartTime(startTime){
        this.startTime = startTime;
    }

    getStartTime(){
        return this.startTime;
    }

    setEndTime(endTime){
        this.endTime = endTime;
    }

    getEndTime(){
        return this.endTime;
    }

    setErrors(errors){
        this.errors = errors;
    }

    getErrors(){
        return this.errors;
    }

    setCorrect(correct){
        this.correct = correct;
    }

    getCorrect(){
        return this.correct;
    }

    setPercent(percent){
        this.percent = percent;
    }

    getPercent(){
        return this.percent;
    }
}