import { getEnv, isStage } from '@helper/environment';
import { User } from '@models/DynamoDB/user.model';
import { dynamoose } from '@services/dynamoose';
import { Document } from 'dynamoose/dist/Document';
import { v4 } from 'uuid';

export type JobStatus =
  | 'offer'
  | 'declined'
  | 'accepted'
  | 'active'
  | 'pending'
  | 'pending_payout'
  | 'paid'
  | 'disputed'
  | 'expired';

export interface JobSchema {
  id?: string;
  producerId: string;
  crewId: string;
  startDate: string;
  endDate: string;
  paidDate?: string;
  flatPrice: number;
  status: JobStatus;
  location: string;
  callTime: string;
  duration: string;
  requirements: string;
  optional: string;
  producer?: User;
  crew?: User;
  lat: number;
  lon: number;
}

export class Job extends Document implements JobSchema {
  public id?: string;
  public producerId: string;
  public crewId: string;
  public startDate: string;
  public endDate: string;
  public paidDate?: string;
  public flatPrice: number;
  public status: JobStatus;
  public location: string;
  public callTime: string;
  public duration: string;
  public requirements: string;
  public optional: string;
  public producer?: User;
  public crew?: User;
  public lat: number;
  public lon: number;

  constructor(job: JobSchema) {
    super(JobModel);

    this.id = job.id;
    this.producerId = job.producerId;
    this.crewId = job.crewId;
    this.startDate = job.startDate;
    this.endDate = job.endDate;
    this.paidDate = job.paidDate;
    this.flatPrice = job.flatPrice;
    this.status = job.status;
    this.location = job.location;
    this.callTime = job.callTime;
    this.duration = job.duration;
    this.requirements = job.requirements;
    this.optional = job.optional;
    this.lat = job.lat;
    this.lon = job.lon;
  }

  public static update(oldJob: Job, newJob: Job): Job {
    const job: Job = new Job(oldJob);
    if (newJob.producerId !== undefined) {
      job.producerId = newJob.producerId;
    }
    if (newJob.crewId !== undefined) {
      job.crewId = newJob.crewId;
    }
    if (newJob.startDate !== undefined) {
      job.startDate = newJob.startDate;
    }
    if (newJob.paidDate !== undefined) {
      job.paidDate = newJob.paidDate;
    }
    if (newJob.endDate !== undefined) {
      job.endDate = newJob.endDate;
    }
    if (newJob.flatPrice !== undefined) {
      job.flatPrice = newJob.flatPrice;
    }
    if (newJob.status !== undefined) {
      job.status = newJob.status;
    }
    if (newJob.location !== undefined) {
      job.location = newJob.location;
    }
    if (newJob.callTime !== undefined) {
      job.callTime = newJob.callTime;
    }
    if (newJob.duration !== undefined) {
      job.duration = newJob.duration;
    }
    if (newJob.requirements !== undefined) {
      job.requirements = newJob.requirements;
    }
    if (newJob.optional !== undefined) {
      job.optional = newJob.optional;
    }
    if (newJob.lat !== undefined) {
      job.lat = newJob.lat;
    }
    if (newJob.lon !== undefined) {
      job.lon = newJob.lon;
    }
    return job;
  }
}

export const jobSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
      default: v4(),
    },
    producerId: {
      type: String,
      index: {
        global: true,
        name: 'ProducerIdGlobalIndex',
        rangeKey: 'status',
      },
    },
    crewId: {
      type: String,
      index: {
        global: true,
        name: 'CrewIdGlobalIndex',
        rangeKey: 'status',
      },
    },
    status: {
      type: String,
    },
    startDate: {
      type: String,
    },
    endDate: {
      type: String,
    },
    paidDate: {
      type: String,
    },
    flatPrice: {
      type: Number,
    },
    location: {
      type: String,
    },
    callTime: {
      type: String,
    },
    duration: {
      type: String,
    },
    requirements: {
      type: String,
    },
    optional: {
      type: String,
    },
    lat: {
      type: Number,
    },
    lon: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export const JobModel = dynamoose.model<Job>(getEnv('JOBS_TABLE_NAME'), jobSchema, {
  create: isStage('local'),
  update: false,
});
