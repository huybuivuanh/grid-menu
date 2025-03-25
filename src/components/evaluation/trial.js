class Trial{
    totalTime;
    errors;
    correct;
    percent;

    Trial(name){
        this.name = name;
        this.totalTime = 0;
        this.errors = 0;
        this.correct = 0;
        this.percent = 0;
    }

    setTotalTime(totalTime){
        this.totalTime = totalTime;
    }

    getTotalTime(){
        return this.totalTime;
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