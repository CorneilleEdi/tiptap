import * as Joi from 'joi';

// Some Enums to access easily the envs
export enum CONFIGURATIONS {
    // Configurations
    APP_NAME = 'app_name',
    APP_VERSION = 'app_version',
    // Configurations
    PORT = 'port',
    ENV = 'environment',
    STAGE = 'stage',

    // GCP
    GCLOUD_PROJECT = 'gcp.project_id',
    STORAGE_USERS_IMAGE_BUCKET = 'gcp.storage.users_images_bucket',
    STORAGE_QUESTIONS_IMAGES_BUCKET = 'gcp.storage.questions_images_bucket',

    // MEILISEARCH
    MEILISEARCH_HOST = 'meilisearch.host',
}

export const configurations = () => ({
    app_name: process.env.APP_NAME,
    app_version: process.env.APP_VERSION || 0.7,
    port: parseInt(process.env.PORT, 10) || 8081,
    environment: process.env.RUNNING_ENVIRONMENT,
    stage: process.env.APP_STAGE,

    gcp: {
        project_id: 'tiptapflow',
        storage: {
            users_images_bucket: 'loopbin-tiptapflow-users-profile-image',
            questions_images_bucket: 'loopbin-tiptapflow-questions-images',
        },
    },
    meilisearch: {
        host: process.env.MEILISEARCH_HOST,
    },
});

// Validate environment variable
export const configurationsValidationSchema = Joi.object({
    // APP
    NODE_ENV: Joi.string()
        .valid('development', 'production', 'test', 'provision')
        .default('development'),
    STAGE: Joi.string().valid('staging', 'production', 'local').default('local'),
    RUNNING_ENVIRONMENT: Joi.string().valid('local', 'cloud').default('local'),
    APP_NAME: Joi.string().default('tiptap'),
    MEILISEARCH_HOST: Joi.string().required(),
});
